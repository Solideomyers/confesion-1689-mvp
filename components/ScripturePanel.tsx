
import React from 'react';
import type { ScriptureProof } from '../types';

interface ScripturePanelProps {
  isOpen: boolean;
  proof: ScriptureProof | null;
  onClose: () => void;
}

const ScripturePanel: React.FC<ScripturePanelProps> = ({ isOpen, proof, onClose }) => {
  if (!proof) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 z-20 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-card border-l border-border shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 h-full flex flex-col">
          <header className="flex items-center justify-between pb-4 border-b border-border">
            <h3 className="text-xl font-bold text-primary font-serif">
              Prueba Escritural <span className="text-foreground">{proof.ref.toUpperCase()}</span>
            </h3>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar panel de escrituras"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <div className="py-4 flex-grow overflow-y-auto">
            <ul className="space-y-3">
              {proof.verses.map((verse, index) => (
                <li key={index} className="text-muted-foreground font-serif text-lg">
                  {verse}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default ScripturePanel;
