
import React from 'react';
import type { Highlight, Chapter } from '../types';

interface HighlightListProps {
  isOpen: boolean;
  onClose: () => void;
  highlights: Highlight[];
  confessionData: Chapter[];
  onNavigate: (paragraphId: string) => void;
  onDelete: (highlightId: string) => void;
}

const HighlightList: React.FC<HighlightListProps> = ({ isOpen, onClose, highlights, confessionData, onNavigate, onDelete }) => {
  
  const getHighlightDetails = (paragraphId: string) => {
    const parts = paragraphId.match(/ch(\d+)-p(\d+)/);
    if (!parts) return null;

    const chapterNumber = parseInt(parts[1], 10);
    const chapter = confessionData.find(ch => ch.chapter === chapterNumber);
    if (!chapter) return null;

    return {
      chapterTitle: chapter.title,
      chapterNumber: chapter.chapter,
      paragraphNumber: parseInt(parts[2], 10),
    };
  };

  const colorClasses = {
    yellow: 'border-yellow-400/50 bg-yellow-400/10 hover:bg-yellow-400/20',
    pink: 'border-pink-400/50 bg-pink-400/10 hover:bg-pink-400/20',
    blue: 'border-blue-400/50 bg-blue-400/10 hover:bg-blue-400/20',
    green: 'border-green-400/50 bg-green-400/10 hover:bg-green-400/20',
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-background/90 z-40 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl h-[90vh] bg-card rounded-lg shadow-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-2xl font-bold font-serif text-primary">Resaltados</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar lista de resaltados"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
          {highlights.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    <path d="M12 22.2V12.55"></path><path d="M15.24 6.27L20.2 3.78"></path>
                    <path d="M21.56 11.11L14.4 15.33"></path><path d="M8.76 6.27L3.8 3.78"></path>
                    <path d="M2.44 11.11L9.6 15.33"></path>
                </svg>
                <p className="text-xl font-serif">No tienes textos resaltados.</p>
                <p className="mt-2">Selecciona un texto en el lector para resaltarlo.</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {highlights.map((highlight) => {
                 const details = getHighlightDetails(highlight.paragraphId);
                 if (!details) return null;

                 return (
                    <li key={highlight.id} className={`p-4 rounded-lg border group transition-all duration-200 ease-in-out ${colorClasses[highlight.color]}`}>
                        <div className="flex items-start justify-between gap-4">
                          <button
                              onClick={() => onNavigate(highlight.paragraphId)}
                              className="flex-grow text-left"
                          >
                              <p className="font-bold text-primary text-sm">
                                {details.chapterNumber === 0 ? details.chapterTitle : `Cap. ${details.chapterNumber}`}, Párrafo {details.paragraphNumber}
                              </p>
                              <p className="mt-1.5 text-foreground/80 font-serif">
                                  "{highlight.text}"
                              </p>
                          </button>
                           <div className="flex items-center space-x-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => onDelete(highlight.id)}
                                className="p-2 rounded-full text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
                                aria-label="Eliminar resaltado"
                              >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                              </button>
                          </div>
                        </div>
                    </li>
                 )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighlightList;