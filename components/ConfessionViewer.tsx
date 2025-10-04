import React, { memo, useState, useRef, useEffect } from 'react';
import type { Chapter, Paragraph, ScriptureProof } from '../types';
import ParagraphNotes from './ParagraphNotes';

interface ConfessionViewerProps {
  chapter: Chapter;
  onShowProof: (proof: ScriptureProof) => void;
}

const ParagraphRenderer: React.FC<{
  paragraph: Paragraph;
  onShowProof: (proof: ScriptureProof) => void;
  onMouseEnterProof: (proof: ScriptureProof, e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeaveProof: () => void;
  chapterNumber: number;
  chapterTitle: string;
}> = ({ paragraph, onShowProof, onMouseEnterProof, onMouseLeaveProof, chapterNumber, chapterTitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const paragraphRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.05,
      }
    );

    const currentRef = paragraphRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const parts = paragraph.text.split(/({[a-z]})/);

  const findProof = (refChar: string) => {
    return paragraph.proofs.find(p => p.ref === refChar);
  };

  const paragraphId = `confession-ch${chapterNumber}-p${paragraph.paragraph}`;

  return (
    <div
      ref={paragraphRef}
      data-chapter-number={chapterNumber}
      data-chapter-title={chapterTitle}
      data-paragraph-number={paragraph.paragraph}
      className={`relative group mb-6 border-b border-border/50 pb-6 last:border-b-0 last:pb-0 transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <p className="text-lg leading-relaxed font-serif text-muted-foreground">
        <span className="font-bold text-foreground pr-2">{paragraph.paragraph}.</span>
        {parts.map((part, index) => {
          const match = part.match(/^{([a-z])}$/);
          if (match) {
            const refChar = match[1];
            const proof = findProof(refChar);
            if (proof) {
              return (
                <sup key={index} className="mx-0.5">
                  <button
                    onClick={() => onShowProof(proof)}
                    onMouseEnter={(e) => onMouseEnterProof(proof, e)}
                    onMouseLeave={onMouseLeaveProof}
                    className="font-bold text-primary hover:text-primary/90 text-base"
                  >
                    {refChar}
                  </button>
                </sup>
              );
            }
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
      <ParagraphNotes paragraphId={paragraphId} />
    </div>
  );
};

const ConfessionViewer: React.FC<ConfessionViewerProps> = ({ chapter, onShowProof }) => {
  const [tooltip, setTooltip] = useState<{
    visible: boolean;
    content: Array<{ ref: string; text?: string; }>;
    top: number;
    left: number;
  } | null>(null);
  const [copiedVerseIndex, setCopiedVerseIndex] = useState<number | null>(null);
   const [selectionToolbar, setSelectionToolbar] = useState<{
    visible: boolean;
    top: number;
    left: number;
    isCopied: boolean;
    chapterNumber?: string;
    chapterTitle?: string;
    paragraphNumber?: string;
  }>({ visible: false, top: 0, left: 0, isCopied: false });

  const hideTooltipTimer = useRef<number | null>(null);
  const viewerRef = useRef<HTMLElement | null>(null);
  const toolbarRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0 && selection.anchorNode) {
        const targetParagraph = (selection.anchorNode.parentElement as HTMLElement)?.closest('[data-paragraph-number]');
        if (targetParagraph) {
            const rect = selection.getRangeAt(0).getBoundingClientRect();
            const { chapterNumber, chapterTitle, paragraphNumber } = (targetParagraph as HTMLElement).dataset;
            
            setSelectionToolbar({
              visible: true,
              top: rect.top + window.scrollY - 50,
              left: rect.left + window.scrollX + rect.width / 2,
              isCopied: false,
              chapterNumber,
              chapterTitle,
              paragraphNumber
            });
        }
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
        setSelectionToolbar(prev => ({ ...prev, visible: false, isCopied: false }));
      }
    };
    
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousedown', handleMouseDown);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);
  
  const handleCopySelection = async () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString();
      const { chapterNumber, chapterTitle, paragraphNumber } = selectionToolbar;
      const isPreface = chapterNumber === '0';
  
      // Plain text version with markdown for italics
      let plainReference = `(*2CFL-1689*`;
      if (isPreface) {
        plainReference += `, ${chapterTitle}`;
      } else {
        plainReference += `, Cap. ${chapterNumber}: ${chapterTitle}`;
      }
      plainReference += `, Párrafo ${paragraphNumber})`;
      const textToCopy = `«${selectedText}»\n\n${plainReference}`;
  
      // HTML version for rich text editors
      let htmlReference = `(<i>2CFL-1689</i>`;
      if (isPreface) {
        htmlReference += `, ${chapterTitle}`;
      } else {
        htmlReference += `, Cap. ${chapterNumber}: ${chapterTitle}`;
      }
      htmlReference += `, Párrafo ${paragraphNumber})`;
      const htmlToCopy = `<p>«${selectedText}»</p><p>${htmlReference}</p>`;
  
      try {
        // Use the Clipboard API to write both plain text and HTML
        const blobHtml = new Blob([htmlToCopy], { type: 'text/html' });
        const blobText = new Blob([textToCopy], { type: 'text/plain' });
        const clipboardItem = new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText,
        });
        await navigator.clipboard.write([clipboardItem]);
  
        setSelectionToolbar(prev => ({ ...prev, isCopied: true }));
        setTimeout(() => {
          setSelectionToolbar(prev => ({ ...prev, isCopied: false, visible: false }));
        }, 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };


  const handleMouseEnterProof = (proof: ScriptureProof, e: React.MouseEvent<HTMLButtonElement>) => {
    if (hideTooltipTimer.current) {
      clearTimeout(hideTooltipTimer.current);
      hideTooltipTimer.current = null;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const content = proof.verses.map((verseRef, index) => ({
      ref: verseRef,
      text: proof.fullText ? proof.fullText[index] : undefined,
    }));

    const viewportWidth = window.innerWidth;
    const tooltipMaxWidth = 352; // Corresponds to max-w-sm (22rem) with some buffer
    const PADDING = 16; // 1rem padding from viewport edges

    let left = rect.left + rect.width / 2;

    if (left - tooltipMaxWidth / 2 < PADDING) {
      left = tooltipMaxWidth / 2 + PADDING;
    }

    if (left + tooltipMaxWidth / 2 > viewportWidth - PADDING) {
      left = viewportWidth - tooltipMaxWidth / 2 - PADDING;
    }

    setTooltip({
      visible: true,
      content: content,
      top: rect.bottom + window.scrollY + 8,
      left: left,
    });
  };

  const handleMouseLeaveProof = () => {
    hideTooltipTimer.current = window.setTimeout(() => {
      setTooltip(null);
      setCopiedVerseIndex(null);
    }, 300);
  };

  const handleMouseEnterTooltip = () => {
    if (hideTooltipTimer.current) {
      clearTimeout(hideTooltipTimer.current);
      hideTooltipTimer.current = null;
    }
  };
  
  const handleCopyProof = async (item: { ref: string; text?: string; }, index: number) => {
    if (!item.text) return;
    try {
      const textToCopy = `"${item.text}" (${item.ref})`;
      await navigator.clipboard.writeText(textToCopy);
      setCopiedVerseIndex(index);
      setTimeout(() => {
        setCopiedVerseIndex(prev => prev === index ? null : prev);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const getCopyButtonClassName = (index: number) => {
    const baseClasses = "absolute top-1/2 right-0 -translate-y-1/2 p-1 rounded-md text-muted-foreground focus:opacity-100 transition-opacity";
    if (copiedVerseIndex === index) {
      return `${baseClasses} opacity-100`;
    }
    return `${baseClasses} opacity-0 group-hover:opacity-100`;
  };

  return (
    <article ref={viewerRef} className="max-w-3xl mx-auto relative">
       {selectionToolbar.visible && (
        <div
          ref={toolbarRef}
          className="fixed z-50 bg-card border border-border rounded-lg shadow-lg flex items-center transition-opacity"
          style={{
            top: `${selectionToolbar.top}px`,
            left: `${selectionToolbar.left}px`,
            transform: 'translateX(-50%)',
          }}
        >
          <button
            onClick={handleCopySelection}
            disabled={selectionToolbar.isCopied}
            className="px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors rounded-lg flex items-center gap-2"
          >
            {selectionToolbar.isCopied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                ¡Copiado!
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copiar
              </>
            )}
          </button>
        </div>
      )}

      {tooltip && tooltip.visible && (
        <div
          className="fixed z-50 p-3 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg max-w-sm text-sm font-sans max-h-[60vh] overflow-y-auto"
          style={{ 
            top: `${tooltip.top}px`, 
            left: `${tooltip.left}px`,
            transform: 'translateX(-50%)',
          }}
          onMouseEnter={handleMouseEnterTooltip}
          onMouseLeave={handleMouseLeaveProof}
        >
          <ul className="space-y-3">
            {tooltip.content.map((item, i) => (
              <li key={i} className="relative group pr-8">
                <p className="font-bold text-primary">{item.ref}</p>
                {item.text && <p className="mt-1 text-popover-foreground/90 italic">"{item.text}"</p>}
                
                {item.text && (
                  <button 
                    onClick={() => handleCopyProof(item, i)}
                    className={getCopyButtonClassName(i)}
                    aria-label="Copiar texto del versículo"
                  >
                  {copiedVerseIndex === i ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      <header className="text-center mb-10">
        {chapter.chapter > 0 && (
          <p className="text-primary font-bold text-lg">Capítulo {chapter.chapter}</p>
        )}
        <h2 className="text-4xl font-bold font-serif text-foreground mt-2">{chapter.title}</h2>
      </header>
      
      <div>
        {chapter.paragraphs.map(p => (
          <ParagraphRenderer
            key={p.paragraph}
            paragraph={p}
            onShowProof={onShowProof}
            onMouseEnterProof={handleMouseEnterProof}
            onMouseLeaveProof={handleMouseLeaveProof}
            chapterNumber={chapter.chapter}
            chapterTitle={chapter.title}
          />
        ))}
      </div>
    </article>
  );
};

export default memo(ConfessionViewer);