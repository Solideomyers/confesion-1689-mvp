
import React, { useState, useEffect, useMemo } from 'react';
import type { Bookmark, Chapter } from '../types';
import TagInput from './TagInput';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bookmarkId: string, updates: Partial<Pick<Bookmark, 'note' | 'tags'>>) => void;
  bookmark: Bookmark | null;
  confessionData: Chapter[];
}

const NoteEditorModal: React.FC<NoteEditorModalProps> = ({ isOpen, onClose, onSave, bookmark, confessionData }) => {
  const [noteText, setNoteText] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const details = useMemo(() => {
    if (!bookmark) return null;
    const parts = bookmark.id.match(/ch(\d+)-p(\d+)/);
    if (!parts) return null;

    const chapterNumber = parseInt(parts[1], 10);
    const paragraphNumber = parseInt(parts[2], 10);

    const chapter = confessionData.find(ch => ch.chapter === chapterNumber);
    if (!chapter) return null;

    const paragraph = chapter.paragraphs.find(p => p.paragraph === paragraphNumber);
    if (!paragraph) return null;

    return {
      chapterTitle: chapter.title,
      chapterNumber: chapter.chapter,
      paragraphNumber: paragraph.paragraph,
      paragraphText: paragraph.text,
    };
  }, [bookmark, confessionData]);
  
  useEffect(() => {
    if (bookmark) {
      setNoteText(bookmark.note || '');
      setTags(bookmark.tags || []);
    }
  }, [bookmark]);

  const handleSave = () => {
    if (bookmark) {
      onSave(bookmark.id, { note: noteText, tags });
      onClose();
    }
  };
  
  if (!isOpen || !details) return null;

  return (
    <div className="fixed inset-0 bg-background/90 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-card rounded-lg shadow-xl w-full max-w-2xl flex flex-col h-[90vh]" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
          <h3 className="text-xl font-bold font-serif text-foreground">
            Nota para {details.chapterNumber === 0 ? details.chapterTitle : `Cap. ${details.chapterNumber}`}, Párrafo {details.paragraphNumber}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="p-6 flex-grow overflow-y-auto">
            <div className="mb-4 bg-accent/30 p-4 rounded-lg">
                <p className="font-serif text-accent-foreground/80 italic">
                    {details.paragraphText}
                </p>
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              className="w-full h-48 bg-input border border-border rounded-md p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              placeholder="Escribe tu nota personal aquí..."
              aria-label="Área de edición de nota"
              autoFocus
            />
            <div className="mt-4">
              <label className="block text-sm font-semibold text-muted-foreground mb-2">Etiquetas</label>
              <TagInput tags={tags} onChange={setTags} />
            </div>
        </div>

        <footer className="flex justify-end space-x-3 p-4 border-t border-border flex-shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Guardar Nota
          </button>
        </footer>
      </div>
    </div>
  );
};

export default NoteEditorModal;