
import React, { useState, useRef, useEffect } from 'react';
import type { Chapter } from '../types';

interface HeaderProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onChapterChange: (index: number) => void;
  onSearchClick: () => void;
  onToggleReaderMode: () => void;
  isReaderMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ chapters, currentChapterIndex, onChapterChange, onSearchClick, onToggleReaderMode, isReaderMode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    onChapterChange(currentChapterIndex - 1);
  };

  const handleNext = () => {
    onChapterChange(currentChapterIndex + 1);
  };

  const handleChapterSelect = (index: number) => {
    onChapterChange(index);
    setIsDropdownOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentChapter = chapters[currentChapterIndex];
  const displayTitle = currentChapter.chapter === 0 ? currentChapter.title : `Capítulo ${currentChapter.chapter}: ${currentChapter.title}`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border transition-transform duration-500 ease-in-out ${isReaderMode ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-5xl mx-auto p-4 flex flex-col sm:flex-row items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground font-serif text-center sm:text-left mb-4 sm:mb-0">
          Confesión de 1689
        </h1>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className="p-2 bg-card border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Capítulo anterior"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-48 sm:w-64 bg-card border border-border text-foreground rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring flex items-center justify-between"
            >
              <span className="truncate">{displayTitle}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            {isDropdownOpen && (
              <ul className="absolute top-full mt-2 w-full bg-popover border border-border rounded-lg shadow-lg z-20 max-h-80 overflow-y-auto">
                {chapters.map((chapter, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleChapterSelect(index)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        currentChapterIndex === index
                          ? 'bg-accent text-primary'
                          : 'text-muted-foreground hover:bg-accent'
                      }`}
                    >
                      {chapter.chapter === 0 ? chapter.title : `Cap. ${chapter.chapter}: ${chapter.title}`}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>


          <button
            onClick={handleNext}
            disabled={currentChapterIndex === chapters.length - 1}
            className="p-2 bg-card border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Siguiente capítulo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
            className={`p-2 rounded-lg transition-colors ${
              isReaderMode 
              ? 'bg-primary text-primary-foreground' 
              : 'bg-card border border-border hover:bg-accent'
            }`}
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
