
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

  return (
    <nav className="max-w-3xl mx-auto mt-12 flex justify-between items-center border-t border-border pt-6">
      {hasPrev && prevChapter ? (
        <button
          onClick={() => onChapterChange(currentChapterIndex - 1)}
          className="text-left p-4 rounded-lg hover:bg-accent transition-colors w-1/2 text-muted-foreground hover:text-foreground"
        >
          <span className="text-sm">Anterior</span>
          <p className="font-bold text-lg text-foreground mt-1 truncate">
            {prevChapter.chapter === 0 ? prevChapter.title : `Cap. ${prevChapter.chapter}: ${prevChapter.title}`}
          </p>
        </button>
      ) : (
        <div className="w-1/2"></div>
      )}

      {hasNext && nextChapter ? (
        <button
          onClick={() => onChapterChange(currentChapterIndex + 1)}
          className="text-right p-4 rounded-lg hover:bg-accent transition-colors w-1/2 text-muted-foreground hover:text-foreground"
        >
          <span className="text-sm">Siguiente</span>
          <p className="font-bold text-lg text-foreground mt-1 truncate">
            {nextChapter.chapter === 0 ? nextChapter.title : `Cap. ${nextChapter.chapter}: ${nextChapter.title}`}
          </p>
        </button>
      ) : (
        <div className="w-1/2"></div>
      )}
    </nav>
  );
};

export default FooterNav;
