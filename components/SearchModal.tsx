
import React, { useState, useMemo } from 'react';
import { confessionData } from '../data/confesion';

interface SearchResult {
  chapterIndex: number;
  chapterTitle: string;
  chapterNumber: number;
  paragraphNumber: number;
  text: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResultClick: (chapterIndex: number) => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onResultClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo<SearchResult[]>(() => {
    if (searchTerm.trim().length < 3) {
      return [];
    }

    const lowercasedTerm = searchTerm.toLowerCase();
    const results: SearchResult[] = [];

    confessionData.forEach((chapter, chapterIndex) => {
      chapter.paragraphs.forEach(paragraph => {
        if (paragraph.text.toLowerCase().includes(lowercasedTerm)) {
          results.push({
            chapterIndex,
            chapterNumber: chapter.chapter,
            chapterTitle: chapter.title,
            paragraphNumber: paragraph.paragraph,
            text: paragraph.text,
          });
        }
      });
    });

    return results;
  }, [searchTerm]);

  if (!isOpen) {
    return null;
  }
  
  const highlightMatch = (text: string, term: string) => {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);
    return (
        <span>
            {parts.map((part, i) =>
                regex.test(part) ? (
                    <mark key={i} className="bg-primary text-primary-foreground px-1 rounded">
                        {part}
                    </mark>
                ) : (
                    part
                )
            )}
        </span>
    );
  };


  return (
    <div
      className="fixed inset-0 bg-background/90 z-40 flex justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl h-full bg-card rounded-lg shadow-xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="relative w-full">
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Buscar en la confesión..."
              autoFocus
              className="w-full bg-background border border-input text-foreground rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar búsqueda"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div className="flex-grow p-4 overflow-y-auto">
          {searchTerm.length > 0 && searchTerm.length < 3 && <p className="text-center text-muted-foreground">Escriba al menos 3 caracteres para buscar.</p>}
          {searchTerm.length >= 3 && searchResults.length === 0 && <p className="text-center text-muted-foreground">No se encontraron resultados para "{searchTerm}".</p>}
          
          <ul className="space-y-4">
            {searchResults.map((result, index) => (
              <li key={index} className="border border-border rounded-lg hover:bg-accent transition-colors">
                <button
                  onClick={() => onResultClick(result.chapterIndex)}
                  className="w-full text-left p-4"
                >
                  <p className="font-bold text-primary">
                    {result.chapterNumber === 0 ? result.chapterTitle : `Capítulo ${result.chapterNumber}: ${result.chapterTitle}`}
                    <span className="text-muted-foreground font-normal">, Párrafo {result.paragraphNumber}</span>
                  </p>
                  <p className="mt-2 text-muted-foreground font-serif">
                    {highlightMatch(`...${result.text.substring(0, 200)}...`, searchTerm)}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
