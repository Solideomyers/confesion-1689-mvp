
import React from 'react';
import type { Chapter } from '../types';

interface ChapterNavigationModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapters: Chapter[];
  currentChapterIndex: number;
  onSelectChapter: (index: number) => void;
}

const ChapterNavigationModal: React.FC<ChapterNavigationModalProps> = ({ isOpen, onClose, chapters, currentChapterIndex, onSelectChapter }) => {
  if (!isOpen) {
    return null;
  }

  const getGridSpan = (index: number) => {
    if (index === 0) { // Preface
      return 'lg:col-span-6';
    }
    const patternIndex = (index - 1) % 5;
    switch (patternIndex) {
      case 0: return 'lg:col-span-4';
      case 1: return 'lg:col-span-2';
      case 2: return 'lg:col-span-2';
      case 3: return 'lg:col-span-2';
      case 4: return 'lg:col-span-2';
      default: return 'lg:col-span-2';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-background/90 z-40 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl h-[90vh] bg-card rounded-lg shadow-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-2xl font-bold font-serif text-primary">Índice de Capítulos</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar índice"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {chapters.map((chapter, index) => (
              <button
                key={index}
                onClick={() => onSelectChapter(index)}
                className={`w-full text-left p-6 rounded-lg border flex flex-col justify-center items-start transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:-translate-y-1 ${getGridSpan(index)} ${
                  currentChapterIndex === index
                    ? 'bg-primary border-primary text-primary-foreground shadow-md'
                    : 'bg-background border-border hover:bg-accent hover:border-accent-foreground'
                }`}
              >
                <p className={`text-sm font-mono ${currentChapterIndex === index ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                  {chapter.chapter === 0 ? 'Prefacio' : `Capítulo ${chapter.chapter}`}
                </p>
                <p className={`font-bold text-lg font-serif mt-2 ${currentChapterIndex === index ? 'text-primary-foreground' : 'text-foreground'}`}>
                  {chapter.title}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterNavigationModal;