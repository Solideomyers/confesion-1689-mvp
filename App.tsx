
import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { ScriptureProof, Chapter, Bookmark } from './types';
import { confessionData } from './data/confesion';
import Header from './components/Header';
import ConfessionViewer from './components/ConfessionViewer';
import ScripturePanel from './components/ScripturePanel';
import SearchModal from './components/SearchModal';
import FooterNav from './components/FooterNav';
import ChapterNavigationModal from './components/ChapterNavigationModal';
import FloatingNav from './components/FloatingNav';
import BookmarkList from './components/BookmarkList';
import NoteEditorModal from './components/NoteEditorModal';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<'home' | 'reader' | 'dashboard'>('home');
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isScripturePanelOpen, setIsScripturePanelOpen] = useState(false);
  const [selectedProof, setSelectedProof] = useState<ScriptureProof | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [isReaderMode, setIsReaderMode] = useState(false);
  const [isChapterNavOpen, setIsChapterNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isBookmarkListOpen, setIsBookmarkListOpen] = useState(false);
  const [scrollToParagraphId, setScrollToParagraphId] = useState<string | null>(null);
  const [activeBookmarkId, setActiveBookmarkId] = useState<string | null>(null);
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null);
  const [theme, setTheme] = useState('dark-matter');
  const touchStartX = useRef(0);

  useEffect(() => {
    let initialTheme = localStorage.getItem('confession_theme');
    if (!initialTheme) {
        initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark-matter'
            : 'light-theme';
    }
    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
  }, []);

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('confession_theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const handleNavigateToReader = useCallback((index: number) => {
    setCurrentChapterIndex(index);
    setView('reader');
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const handleGoHome = useCallback(() => {
    setView('home');
  }, []);

  const handleGoToDashboard = useCallback(() => {
    setView('dashboard');
  }, []);
  
  const handleDeleteAllData = useCallback(() => {
    localStorage.removeItem('confession_bookmarks');
    localStorage.removeItem('confession_theme');
    confessionData.forEach((_, index) => {
        localStorage.removeItem(`scroll_ch_${index}`);
    });
    setBookmarks([]);
    setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-matter' : 'light-theme');
    document.documentElement.className = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-matter' : 'light-theme';
    setView('home');
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem('confession_bookmarks');
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
    } catch (error) {
      console.error("Failed to parse bookmarks from localStorage", error);
      setBookmarks([]);
    }
  }, []);
  
  useEffect(() => {
    if (scrollToParagraphId) {
      setTimeout(() => {
        const element = document.getElementById(scrollToParagraphId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          element.classList.add('highlight-bookmark');
          setTimeout(() => element.classList.remove('highlight-bookmark'), 2000);
        }
        setScrollToParagraphId(null);
      }, 100); 
    }
  }, [scrollToParagraphId]);

  const handleToggleBookmark = useCallback((paragraphId: string) => {
    setBookmarks(prevBookmarks => {
      const isBookmarked = prevBookmarks.some(b => b.id === paragraphId);
      const newBookmarks = isBookmarked
        ? prevBookmarks.filter(b => b.id !== paragraphId)
        : [...prevBookmarks, { id: paragraphId }];
      
      localStorage.setItem('confession_bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  }, []);
  
  const handleDeleteBookmark = useCallback((bookmarkId: string) => {
    setBookmarks(prevBookmarks => {
        const newBookmarks = prevBookmarks.filter(b => b.id !== bookmarkId);
        localStorage.setItem('confession_bookmarks', JSON.stringify(newBookmarks));
        return newBookmarks;
    });
  }, []);

  const handleUpdateBookmark = useCallback((bookmarkId: string, note: string) => {
    setBookmarks(prevBookmarks => {
      const newBookmarks = prevBookmarks.map(b => 
        b.id === bookmarkId ? { ...b, note } : b
      );
      localStorage.setItem('confession_bookmarks', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  }, []);
  
  const handleOpenNoteEditor = useCallback((bookmarkId: string) => {
    const bookmarkToEdit = bookmarks.find(b => b.id === bookmarkId);
    if (bookmarkToEdit) {
      setEditingBookmark(bookmarkToEdit);
    }
  }, [bookmarks]);

  const handleCloseNoteEditor = useCallback(() => {
    setEditingBookmark(null);
  }, []);


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
    if (view === 'reader') {
      const savedScroll = localStorage.getItem(`scroll_ch_${currentChapterIndex}`);
      if (savedScroll) {
        window.scrollTo(0, parseInt(savedScroll, 10));
      }
    }
  }, [currentChapterIndex, view]);

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
    handleNavigateToReader(chapterIndex);
    handleCloseSearch();
  }, [handleNavigateToReader, handleCloseSearch]);

  const handleToggleReaderMode = useCallback(() => {
    setIsReaderMode(prev => !prev);
    if (!isReaderMode) {
      setShowGoToTop(false);
    }
  }, [isReaderMode]);

  const handleOpenChapterNav = useCallback(() => setIsChapterNavOpen(true), []);
  const handleCloseChapterNav = useCallback(() => setIsChapterNavOpen(false), []);
  
  const handleOpenBookmarkList = useCallback(() => {
    const paragraphs = document.querySelectorAll<HTMLElement>('[id^="confession-ch"]');
    let topParagraph: HTMLElement | null = null;
    let minTopValue = Infinity;

    paragraphs.forEach(p => {
      const rect = p.getBoundingClientRect();
      if (rect.top >= 0 && rect.top < minTopValue) {
        minTopValue = rect.top;
        topParagraph = p;
      }
    });

    if (topParagraph) {
      const topParagraphId = topParagraph.id;
      if (bookmarks.some(b => b.id === topParagraphId)) {
        setActiveBookmarkId(topParagraphId);
      } else {
        setActiveBookmarkId(null);
      }
    } else {
      setActiveBookmarkId(null);
    }
    
    setIsBookmarkListOpen(true);
  }, [bookmarks]);
  
  const handleCloseBookmarkList = useCallback(() => {
    setIsBookmarkListOpen(false);
    setActiveBookmarkId(null);
  }, []);
  
  const handleNavigateToBookmark = (bookmarkId: string) => {
    const parts = bookmarkId.match(/ch(\d+)-p(\d+)/);
    if (parts) {
      const chapterNumber = parseInt(parts[1], 10);
      const chapterIndex = confessionData.findIndex(ch => ch.chapter === chapterNumber);
      
      if (chapterIndex !== -1) {
        handleNavigateToReader(chapterIndex);
        setScrollToParagraphId(bookmarkId);
      }
    }
    handleCloseBookmarkList();
  };

  useEffect(() => {
    if (view !== 'reader') return;

    let scrollTimeout: number;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      if (!isReaderMode) {
        setShowGoToTop(scrollY > 200);
      } else {
        setShowGoToTop(false);
      }

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
  }, [currentChapterIndex, isReaderMode, view]);

  useEffect(() => {
    if (view !== 'reader') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSearchModalOpen || isScripturePanelOpen || isChapterNavOpen || isBookmarkListOpen) return;

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
      if (isSearchModalOpen || isScripturePanelOpen || isChapterNavOpen || isBookmarkListOpen) return;

      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartX.current;
      const minSwipeDistance = 50;

      if (deltaX > minSwipeDistance) {
        handleChapterChange(currentChapterIndex - 1);
      } else if (deltaX < -minSwipeDistance) {
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
  }, [currentChapterIndex, handleChapterChange, isSearchModalOpen, isScripturePanelOpen, isChapterNavOpen, isBookmarkListOpen, view]);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    localStorage.removeItem(`scroll_ch_${currentChapterIndex}`);
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return <Home chapters={confessionData} onSelectChapter={handleNavigateToReader} />;
      case 'dashboard': {
        const readingProgress = Math.round(((currentChapterIndex + 1) / confessionData.length) * 100);
        const noteCount = bookmarks.filter(b => b.note && b.note.trim() !== '').length;
        const stats = {
          readingProgress,
          bookmarkCount: bookmarks.length,
          noteCount
        };
        const handleExportData = () => {
            const dataStr = JSON.stringify({ bookmarks }, null, 2);
            const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
            const exportFileDefaultName = 'confession_data.json';
            const linkElement = document.createElement('a');
            linkElement.setAttribute('href', dataUri);
            linkElement.setAttribute('download', exportFileDefaultName);
            linkElement.click();
        };

        return <Dashboard stats={stats} onExportData={handleExportData} onDeleteAllData={handleDeleteAllData} />;
      }
      case 'reader': {
        const currentChapterData = confessionData[currentChapterIndex];
        const isFloatingNavVisible = isMobile || isReaderMode;
        const isHeaderVisible = !isFloatingNavVisible;
        return (
            <>
                <main className={`flex-grow px-4 transition-all duration-300 ${isReaderMode ? 'pt-16' : 'pt-24'} ${isFloatingNavVisible ? 'pb-24' : 'pb-16'}`}>
                    <ConfessionViewer
                    chapter={currentChapterData}
                    onShowProof={handleShowProof}
                    bookmarks={bookmarks}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenNoteEditor={handleOpenNoteEditor}
                    />
                    {isHeaderVisible && (
                    <FooterNav 
                        chapters={confessionData}
                        currentChapterIndex={currentChapterIndex}
                        onChapterChange={(index) => handleNavigateToReader(index)}
                    />
                    )}
                </main>
                <div className={`transition-opacity duration-300 ease-in-out ${isFloatingNavVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <FloatingNav
                    onPrev={() => handleChapterChange(currentChapterIndex - 1)}
                    onNext={() => handleChapterChange(currentChapterIndex + 1)}
                    isPrevDisabled={currentChapterIndex === 0}
                    isNextDisabled={currentChapterIndex === confessionData.length - 1}
                    onOpenChapterNav={handleOpenChapterNav}
                    onToggleReaderMode={handleToggleReaderMode}
                    onOpenBookmarkList={handleOpenBookmarkList}
                    onThemeChange={handleThemeChange}
                    currentTheme={theme}
                    />
                </div>
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
            </>
        );
      }
      default:
        return <Home chapters={confessionData} onSelectChapter={handleNavigateToReader} />;
    }
  };


  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header
        view={view}
        onSearchClick={handleOpenSearch}
        onToggleReaderMode={handleToggleReaderMode}
        onOpenChapterNav={handleOpenChapterNav}
        isHeaderVisible={true} // Simplified, Header manages its own content visibility
        onOpenBookmarkList={handleOpenBookmarkList}
        onGoHome={handleGoHome}
        onThemeChange={handleThemeChange}
        currentTheme={theme}
        onGoToDashboard={handleGoToDashboard}
      />
      
      {renderContent()}

      {view === 'reader' && (
        <>
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
            onSelectChapter={(index) => {
                handleNavigateToReader(index);
                handleCloseChapterNav();
            }}
            />
            <BookmarkList
            isOpen={isBookmarkListOpen}
            onClose={handleCloseBookmarkList}
            bookmarks={bookmarks}
            confessionData={confessionData}
            onNavigate={handleNavigateToBookmark}
            onDelete={handleDeleteBookmark}
            onUpdate={handleUpdateBookmark}
            activeBookmarkId={activeBookmarkId}
            />
            <NoteEditorModal
            isOpen={!!editingBookmark}
            onClose={handleCloseNoteEditor}
            onSave={handleUpdateBookmark}
            bookmark={editingBookmark}
            confessionData={confessionData}
            />
        </>
      )}
    </div>
  );
}
