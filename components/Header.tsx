
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
  view: 'home' | 'reader' | 'dashboard';
  onSearchClick: () => void;
  onToggleReaderMode: () => void;
  onOpenChapterNav: () => void;
  onOpenBookmarkList: () => void;
  onOpenHighlightList: () => void;
  isHeaderVisible: boolean;
  onGoHome: () => void;
  onThemeChange: (theme: string) => void;
  currentTheme: string;
  onGoToDashboard: () => void;
  onOpenReadingSettings: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  view,
  onSearchClick, 
  onToggleReaderMode, 
  onOpenChapterNav, 
  onOpenBookmarkList,
  onOpenHighlightList,
  isHeaderVisible, 
  onGoHome,
  onThemeChange,
  currentTheme,
  onGoToDashboard,
  onOpenReadingSettings
}) => {
  return (
    <header className={`fixed top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-sm border-b border-border transition-opacity duration-300 ease-in-out ${isHeaderVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <button onClick={onGoHome} className="text-left" disabled={view === 'home'}>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground font-serif text-center sm:text-left break-words">
            Confesión de 1689
            </h1>
        </button>
        <div className="flex items-center space-x-2">
          {view === 'reader' ? (
            <>
              <button
                  onClick={onOpenChapterNav}
                  className="hidden sm:inline-block px-4 py-2 bg-card border border-border text-foreground rounded-lg hover:bg-accent transition-colors"
                  aria-label="Abrir índice de capítulos"
                >
                  Índice
              </button>
              
              <button
                onClick={onOpenReadingSettings}
                className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
                aria-label="Ajustes de lectura"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.884 5.036A9 9 0 0117.965 15h.015" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5a2 2 0 01-2-2h4a2 2 0 01-2 2zm0 0v.01" />
                </svg>
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

              <button
                onClick={onOpenBookmarkList}
                className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
                aria-label="Ver marcadores"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>

              <button
                onClick={onOpenHighlightList}
                className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
                aria-label="Ver resaltados"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    <path d="M12 22.2V12.55"></path>
                    <path d="M15.24 6.27L20.2 3.78"></path>
                    <path d="M21.56 11.11L14.4 15.33"></path>
                    <path d="M8.76 6.27L3.8 3.78"></path>
                    <path d="M2.44 11.11L9.6 15.33"></path>
                </svg>
              </button>
            </>
          ) : (
            <>
               <button className="px-4 py-2 text-sm bg-card border border-border rounded-lg hover:bg-accent transition-colors opacity-50 cursor-not-allowed">
                  Sobre nosotros
               </button>
               <button className="px-4 py-2 text-sm bg-card border border-border rounded-lg hover:bg-accent transition-colors opacity-50 cursor-not-allowed">
                  Iniciar sesión
               </button>
            </>
          )}
           <button
            onClick={onGoToDashboard}
            className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
            aria-label="Abrir panel de control"
            disabled={view === 'dashboard'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <ThemeSwitcher onThemeChange={onThemeChange} currentTheme={currentTheme} direction="down" />
        </div>
      </div>
    </header>
  );
};

export default Header;