
import React, { useState, useCallback, useEffect } from 'react';
import type { ScriptureProof, Chapter } from './types';
import { confessionData } from './data/confesion';
import Header from './components/Header';
import ConfessionViewer from './components/ConfessionViewer';
import ScripturePanel from './components/ScripturePanel';
import SearchModal from './components/SearchModal';

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isScripturePanelOpen, setIsScripturePanelOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<ScriptureProof | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [isReaderMode, setIsReaderMode] = useState(false);

  const handleChapterChange = useCallback((index: number) => {
    if (index >= 0 && index < confessionData.length) {
      setCurrentChapterIndex(index);
      const savedScroll = localStorage.getItem(`scroll_ch_${index}`);
      if (savedScroll) {
        window.scrollTo({ top: parseInt(savedScroll, 10), behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    const savedScroll = localStorage.getItem(`scroll_ch_${currentChapterIndex}`);
    if (savedScroll) {
      window.scrollTo(0, parseInt(savedScroll, 10));
    }
  }, [currentChapterIndex]);

  const handleShowProof = useCallback((proof: ScriptureProof) => {
    setSelectedProof(proof);
    setIsScripturePanelOpen(true);
  }, []);

  const handleCloseScripturePanel = useCallback(() => {
    setIsScripturePanelOpen(false);
  }, []);

  const handleOpenSearch = useCallback(() => {
    setIsSearchModalOpen(true);
  }, []);

  const handleCloseSearch = useCallback(() => {
    setIsSearchModalOpen(false);
  }, []);

  const handleSearchResultClick = useCallback((chapterIndex: number) => {
    handleChapterChange(chapterIndex);
    handleCloseSearch();
  }, [handleChapterChange, handleCloseSearch]);

  const handleToggleReaderMode = useCallback(() => {
    setIsReaderMode(prev => !prev);
  }, []);

  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      // Go to top button visibility
      if (!showGoToTop && window.scrollY > 200) {
        setShowGoToTop(true);
      } else if (showGoToTop && window.scrollY <= 200) {
        setShowGoToTop(false);
      }

      // Save scroll position
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        if (window.scrollY > 50) {
           localStorage.setItem(`scroll_ch_${currentChapterIndex}`, window.scrollY.toString());
        } else {
           localStorage.removeItem(`scroll_ch_${currentChapterIndex}`);
        }
      }, 250); // Throttle saving scroll position
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [showGoToTop, currentChapterIndex]);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    localStorage.removeItem(`scroll_ch_${currentChapterIndex}`);
  };

  const currentChapterData = confessionData[currentChapterIndex];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      {!isReaderMode && (
        <Header
          chapters={confessionData}
          currentChapterIndex={currentChapterIndex}
          onChapterChange={handleChapterChange}
          onSearchClick={handleOpenSearch}
          onToggleReaderMode={handleToggleReaderMode}
        />
      )}
      
      {isReaderMode && (
        <button
          onClick={handleToggleReaderMode}
          className="fixed top-4 right-4 z-20 bg-card/80 backdrop-blur-sm text-foreground p-2 px-4 rounded-lg border border-border shadow-md hover:bg-accent transition-colors text-sm"
          aria-label="Salir del modo lectura"
        >
          Salir del modo lectura
        </button>
      )}

      <main className={`flex-grow pb-16 px-4 transition-all duration-300 ${isReaderMode ? 'pt-16' : 'pt-32'}`}>
        <ConfessionViewer
          chapter={currentChapterData}
          onShowProof={handleShowProof}
        />
      </main>
      <ScripturePanel
        isOpen={isScripturePanelOpen}
        proof={selectedProof}
        onClose={handleCloseScripturePanel}
      />
      <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={handleCloseSearch}
        onResultClick={handleSearchResultClick}
      />
      {!isReaderMode && showGoToTop && (
        <button
          onClick={handleGoToTop}
          className="fixed bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 ease-in-out z-20"
          aria-label="Volver arriba"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
