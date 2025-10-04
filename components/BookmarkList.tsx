
import React, { useState } from 'react';
import type { Bookmark, Chapter } from '../types';
import ConfirmationModal from './ConfirmationModal';

interface BookmarkListProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: Bookmark[];
  confessionData: Chapter[];
  onNavigate: (bookmarkId: string) => void;
  onDelete: (bookmarkId: string) => void;
  onUpdate: (bookmarkId: string, note: string) => void;
  activeBookmarkId?: string | null;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ isOpen, onClose, bookmarks, confessionData, onNavigate, onDelete, onUpdate, activeBookmarkId }) => {
  const [bookmarkToDelete, setBookmarkToDelete] = useState<Bookmark | null>(null);
  const [editingBookmarkId, setEditingBookmarkId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleOpenConfirmModal = (bookmark: Bookmark) => {
    setBookmarkToDelete(bookmark);
  };

  const handleCloseConfirmModal = () => {
    setBookmarkToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (bookmarkToDelete) {
        onDelete(bookmarkToDelete.id);
    }
    handleCloseConfirmModal();
  };
  
  const getBookmarkDetails = (bookmarkId: string) => {
    const parts = bookmarkId.match(/ch(\d+)-p(\d+)/);
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
      textSnippet: paragraph.text.substring(0, 150) + '...',
    };
  };

  const handleEditClick = (bookmark: Bookmark, details: any) => {
    setEditingBookmarkId(bookmark.id);
    setEditText(bookmark.note || details.textSnippet);
  };

  const handleSaveEdit = () => {
    if (editingBookmarkId) {
      onUpdate(editingBookmarkId, editText);
      setEditingBookmarkId(null);
      setEditText('');
    }
  };

  const handleCancelEdit = () => {
    setEditingBookmarkId(null);
    setEditText('');
  };
  
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-background/90 z-40 flex justify-center items-center p-4"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-2xl h-[90vh] bg-card rounded-lg shadow-xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <header className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
            <h2 className="text-2xl font-bold font-serif text-primary">Marcadores</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar lista de marcadores"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>

          <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
            {bookmarks.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <p className="text-xl font-serif">No tienes marcadores guardados.</p>
                  <p className="mt-2">Haz clic en el icono de marcador en un párrafo para guardarlo aquí.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {bookmarks.map((bookmark) => {
                   const details = getBookmarkDetails(bookmark.id);
                   if (!details) return null;
                   
                   const isEditing = editingBookmarkId === bookmark.id;

                   return (
                      <li key={bookmark.id} className={`p-4 rounded-lg border transition-all duration-200 ease-in-out ${
                        isEditing 
                          ? 'bg-accent/50 border-primary/50' 
                          : `hover:bg-accent hover:-translate-y-1 active:scale-[0.98] ${bookmark.id === activeBookmarkId ? 'border-primary' : 'border-border'}`
                      }`}>
                        {isEditing ? (
                          <div>
                            <p className="font-bold text-primary mb-2">
                               {details.chapterNumber === 0 ? details.chapterTitle : `Cap. ${details.chapterNumber}: ${details.chapterTitle}`}
                               <span className="text-sm text-muted-foreground font-normal">, Párrafo {details.paragraphNumber}</span>
                            </p>
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full bg-input border border-border rounded-md p-2 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                              rows={4}
                            />
                            <div className="flex justify-end space-x-2 mt-2">
                              <button onClick={handleCancelEdit} className="px-3 py-1 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 text-sm">Cancelar</button>
                              <button onClick={handleSaveEdit} className="px-3 py-1 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 text-sm">Guardar</button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={() => onNavigate(bookmark.id)}
                                className="flex-grow text-left"
                            >
                                <p className="font-bold text-primary text-sm">
                                  {details.chapterNumber === 0 ? details.chapterTitle : `Cap. ${details.chapterNumber}`}, Párrafo {details.paragraphNumber}
                                </p>
                                <p className="mt-1 text-foreground/80 font-serif">
                                    {bookmark.note ? bookmark.note : `"${details.textSnippet}"`}
                                </p>
                            </button>
                             <div className="flex items-center space-x-1 flex-shrink-0">
                                <button
                                  onClick={() => handleEditClick(bookmark, details)}
                                  className="p-2 rounded-full text-muted-foreground hover:bg-accent hover:text-primary transition-colors"
                                  aria-label="Editar nota del marcador"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => handleOpenConfirmModal(bookmark)}
                                  className="p-2 rounded-full text-muted-foreground hover:bg-destructive/20 hover:text-destructive transition-colors"
                                  aria-label="Eliminar marcador"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                          </div>
                        )}
                      </li>
                   )
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={!!bookmarkToDelete}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
        title="Confirmar Eliminación"
        message="¿Estás seguro de que quieres eliminar este marcador? Esta acción no se puede deshacer."
      />
    </>
  );
};

export default BookmarkList;
