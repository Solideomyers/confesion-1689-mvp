
import React, { useState, useCallback } from 'react';
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

  const handleChapterChange = useCallback((index: number) => {
    if (index >= 0 && index < confessionData.length) {
      setCurrentChapterIndex(index);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

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


  const currentChapterData = confessionData[currentChapterIndex];

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header
        // FIX: Corrected typo from 'confesionData' to 'confessionData'.
        chapters={confessionData}
        currentChapterIndex={currentChapterIndex}
        onChapterChange={handleChapterChange}
        onSearchClick={handleOpenSearch}
      />
      <main className="flex-grow pt-32 pb-16 px-4">
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
    </div>
  );
}