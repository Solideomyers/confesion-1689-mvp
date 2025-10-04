
import React from 'react';

interface FloatingNavProps {
  onPrev: () => void;
  onNext: () => void;
  isPrevDisabled: boolean;
  isNextDisabled: boolean;
  onOpenChapterNav: () => void;
  onToggleReaderMode: () => void;
  onOpenBookmarkList: () => void;
}

const FloatingNav: React.FC<FloatingNavProps> = ({
  onPrev,
  onNext,
  isPrevDisabled,
  isNextDisabled,
  onOpenChapterNav,
  onToggleReaderMode,
  onOpenBookmarkList
}) => {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-20">
      <div className="flex items-center space-x-2 bg-card/70 backdrop-blur-lg border border-border rounded-full shadow-lg p-2">
        <button
          onClick={onPrev}
          disabled={isPrevDisabled}
          className="p-3 bg-transparent rounded-full hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Capítulo anterior"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={onOpenChapterNav}
          className="p-3 bg-transparent rounded-full hover:bg-accent transition-colors"
          aria-label="Abrir índice de capítulos"
        >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </button>
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className="p-3 bg-transparent rounded-full hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Siguiente capítulo"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="w-px h-6 bg-border mx-1"></div>
        <button
            onClick={onToggleReaderMode}
            className="p-3 bg-transparent rounded-full hover:bg-accent transition-colors"
            aria-label="Activar modo lectura"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        </button>
        <button
            onClick={onOpenBookmarkList}
            className="p-3 bg-transparent rounded-full hover:bg-accent transition-colors"
            aria-label="Ver marcadores"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
        </button>
      </div>
    </nav>
  );
};

export default FloatingNav;