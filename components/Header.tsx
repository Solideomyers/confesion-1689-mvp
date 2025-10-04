
import React from 'react';

interface HeaderProps {
  onSearchClick: () => void;
  onToggleReaderMode: () => void;
  onOpenChapterNav: () => void;
  isHeaderVisible: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, onToggleReaderMode, onOpenChapterNav, isHeaderVisible }) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border transition-opacity duration-300 ease-in-out ${isHeaderVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground font-serif text-center sm:text-left break-words">
          Confesión de 1689
        </h1>

        <div className="flex items-center space-x-2">
          <button
              onClick={onOpenChapterNav}
              className="px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
              aria-label="Abrir índice de capítulos"
            >
              Índice
          </button>

          <button
            onClick={onSearchClick}
            className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
            aria-label="Buscar en la confesión"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          
           <button
            onClick={onToggleReaderMode}
            className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
            aria-label="Activar modo lectura"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
