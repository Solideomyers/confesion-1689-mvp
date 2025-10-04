
import React from 'react';
import type { Chapter } from '../types';

interface FooterNavProps {
  chapters: Chapter[];
  currentChapterIndex: number;
  onChapterChange: (index: number) => void;
}

const FooterNav: React.FC<FooterNavProps> = ({ chapters, currentChapterIndex, onChapterChange }) => {
  const hasPrev = currentChapterIndex > 0;
  const hasNext = currentChapterIndex < chapters.length - 1;

  const prevChapter = hasPrev ? chapters[currentChapterIndex - 1] : null;
  const nextChapter = hasNext ? chapters[currentChapterIndex + 1] : null;

  const cardClasses = "group w-full sm:w-1/2 p-4 sm:p-6 rounded-lg border border-border flex items-center gap-4 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg bg-card hover:bg-accent";

  return (
    <nav className="max-w-3xl mx-auto mt-16 flex flex-col sm:flex-row gap-4 justify-between sm:items-stretch border-t border-border pt-8">
      {hasPrev && prevChapter ? (
        <button
          onClick={() => onChapterChange(currentChapterIndex - 1)}
          className={`${cardClasses} justify-start`}
        >
          <div className="transform transition-transform duration-300 group-hover:-translate-x-1 text-muted-foreground group-hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </div>
          <div className="text-left">
            <span className="text-sm text-muted-foreground">Anterior</span>
            <p className="font-bold text-lg text-foreground mt-1">
              {prevChapter.title}
            </p>
          </div>
        </button>
      ) : (
        <div className="w-full sm:w-1/2"></div>
      )}

      {hasNext && nextChapter ? (
        <button
          onClick={() => onChapterChange(currentChapterIndex + 1)}
          className={`${cardClasses} justify-end text-right`}
        >
          <div>
            <span className="text-sm text-muted-foreground">Siguiente</span>
            <p className="font-bold text-lg text-foreground mt-1">
              {nextChapter.title}
            </p>
          </div>
          <div className="transform transition-transform duration-300 group-hover:translate-x-1 text-muted-foreground group-hover:text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </button>
      ) : (
        <div className="w-full sm:w-1/2"></div>
      )}
    </nav>
  );
};

export default FooterNav;
