
import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { ScriptureProof, Chapter } from './types';
import { confessionData } from './data/confesion';
import Header from './components/Header';
import ConfessionViewer from './components/ConfessionViewer';
import ScripturePanel from './components/ScripturePanel';
import SearchModal from './components/SearchModal';
import FooterNav from './components/FooterNav';
import ChapterNavigationModal from './components/ChapterNavigationModal';
import FloatingNav from './components/FloatingNav';

export default function App() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isScripturePanelOpen, setIsScripturePanelOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<ScriptureProof | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [isChapterNavOpen, setIsChapterNavOpen] = useState(false);
  const [showFloatingNav, setShowFloatingNav] = useState(false);
  const touchStartX = useRef(0);


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
    if (!isReaderMode) { // Al entrar en modo lectura
      setShowGoToTop(false);
    }
  }, [isReaderMode]);

  const handleOpenChapterNav = useCallback(() => setIsChapterNavOpen(true), []);
  const handleCloseChapterNav = useCallback(() => setIsChapterNavOpen(false), []);
  const handleSelectChapterFromNav = useCallback((index: number) => {
    handleChapterChange(index);
    handleCloseChapterNav();
  }, [handleChapterChange, handleCloseChapterNav]);

  useEffect(() => {
    let scrollTimeout: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Floating Nav visibility
      setShowFloatingNav(scrollY > 0);

      // Go to top button visibility
      if (!isReaderMode) {
        setShowGoToTop(scrollY > 200);
      } else {
        setShowGoToTop(false);
      }

      // Save scroll position
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        if (scrollY > 50) {
           localStorage.setItem(`scroll_ch_${currentChapterIndex}`, scrollY.toString());
        } else {
           localStorage.removeItem(`scroll_ch_${currentChapterIndex}`);
        }
      }, 250);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentChapterIndex, isReaderMode]);


  // Keyboard and Swipe Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSearchModalOpen || isScripturePanelOpen || isChapterNavOpen) return;

      if (e.key === 'ArrowLeft') {
        handleChapterChange(currentChapterIndex - 1);
      } else if (e.key === 'ArrowRight') {
        handleChapterChange(currentChapterIndex + 1);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isSearchModalOpen || isScripturePanelOpen || isChapterNavOpen) return;

      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX.current;
      const minSwipeDistance = 50;

      if (deltaX > minSwipeDistance) { // Swipe Right
        handleChapterChange(currentChapterIndex - 1);
      } else if (deltaX < -minSwipeDistance) { // Swipe Left
        handleChapterChange(currentChapterIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentChapterIndex, handleChapterChange, isSearchModalOpen, isScripturePanelOpen, isChapterNavOpen]);


  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    localStorage.removeItem(`scroll_ch_${currentChapterIndex}`);
  };

  const currentChapterData = confessionData[currentChapterIndex];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header
        onSearchClick={handleOpenSearch}
        onToggleReaderMode={handleToggleReaderMode}
        onOpenChapterNav={handleOpenChapterNav}
        isHeaderVisible={!showFloatingNav && !isReaderMode}
      />
      
      {isReaderMode && (
         <button
          onClick={handleToggleReaderMode}
          className="fixed top-6 right-6 z-20 p-2 bg-card/80 backdrop-blur-sm rounded-full text-primary border border-border shadow-lg hover:bg-accent transition-all duration-300 ease-in-out"
          aria-label="Salir del modo lectura"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </button>
      )}

      <main className={`flex-grow pb-16 px-4 transition-all duration-300 ${isReaderMode ? 'pt-16' : 'pt-32'}`}>
        <ConfessionViewer
          chapter={currentChapterData}
          onShowProof={handleShowProof}
        />
        {!isReaderMode && (
          <FooterNav 
            chapters={confessionData}
            currentChapterIndex={currentChapterIndex}
            onChapterChange={handleChapterChange}
          />
        )}
      </main>

      <div className={`transition-opacity duration-300 ease-in-out ${showFloatingNav && !isReaderMode ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <FloatingNav
          onPrev={() => handleChapterChange(currentChapterIndex - 1)}
          onNext={() => handleChapterChange(currentChapterIndex + 1)}
          isPrevDisabled={currentChapterIndex === 0}
          isNextDisabled={currentChapterIndex === confessionData.length - 1}
          onOpenChapterNav={handleOpenChapterNav}
          onToggleReaderMode={handleToggleReaderMode}
        />
      </div>

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
      <ChapterNavigationModal
        isOpen={isChapterNavOpen}
        onClose={handleCloseChapterNav}
        chapters={confessionData}
        currentChapterIndex={currentChapterIndex}
        onSelectChapter={handleSelectChapterFromNav}
      />
      {!isReaderMode && showGoToTop && (
        <button
          onClick={handleGoToTop}
          className="fixed bottom-24 sm:bottom-8 right-8 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 ease-in-out z-20"
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
