import React, { useState } from 'react';
import type { ScriptureProof } from '../types';

interface ScripturePanelProps {
  isOpen: boolean;
  proof: ScriptureProof | null;
  onClose: () => void;
}

const ScripturePanel: React.FC<ScripturePanelProps> = ({ isOpen, proof, onClose }) => {
  const [isAllCopied, setIsAllCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!proof) return null;

  const handleCopyAll = () => {
    if (!proof) return;

    const textToCopy = `Textos de Prueba (${proof.ref.toUpperCase()})\n\n` +
      proof.verses.map((verse, index) => {
        const text = proof.fullText?.[index] ?? 'Texto no disponible.';
        return `${verse}\n"${text}"`;
      }).join('\n\n');
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        setIsAllCopied(true);
        setTimeout(() => setIsAllCopied(false), 2000);
    });
  };

  const handleCopyIndividual = (verse: string, text: string | undefined, index: number) => {
    if (!text) return;
    const textToCopy = `"${text}" (${verse})`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-20 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 h-full flex flex-col">
          <header className="flex items-center justify-between pb-4 border-b border-border">
            <h3 className="text-xl font-bold text-primary font-serif">
              Textos de Prueba <span className="text-foreground">{proof.ref.toUpperCase()}</span>
            </h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopyAll}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                aria-label="Copiar todos los textos de prueba"
              >
                {isAllCopied ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent"
                aria-label="Cerrar panel de escrituras"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </header>
          <div className="py-4 flex-grow overflow-y-auto custom-scrollbar -mr-3 pr-3">
            <ul className="space-y-6">
              {proof.verses.map((verse, index) => {
                const fullText = proof.fullText?.[index];
                return (
                    <li key={index} className="relative group">
                      <p className="font-bold text-foreground text-base mb-2">{verse}</p>
                      {fullText ? (
                          <blockquote className="border-l-4 border-primary/50 pl-4 italic text-muted-foreground font-serif text-base leading-relaxed pr-8">
                          {fullText}
                          </blockquote>
                      ) : (
                          <p className="pl-4 text-sm text-muted-foreground/70 italic">
                          Texto completo no disponible.
                          </p>
                      )}
                      {fullText && (
                          <button
                              onClick={() => handleCopyIndividual(verse, fullText, index)}
                              className="absolute top-0 right-0 p-1.5 text-muted-foreground hover:text-foreground transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 rounded-lg hover:bg-accent"
                              aria-label={`Copiar ${verse}`}
                          >
                              {copiedIndex === index ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                              ) : (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                  </svg>
                              )}
                          </button>
                      )}
                    </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ScripturePanel;
