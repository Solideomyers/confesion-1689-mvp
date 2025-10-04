import React, { useState, useEffect } from 'react';

interface ParagraphNotesProps {
  paragraphId: string;
}

const ParagraphNotes: React.FC<ParagraphNotesProps> = ({ paragraphId }) => {
  const [note, setNote] = useState<string>('');
  const [editingNote, setEditingNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    const savedNote = localStorage.getItem(paragraphId);
    if (savedNote) {
      setNote(savedNote);
    } else {
      setNote('');
    }
    setIsEditing(false); // Reset editing state on paragraph change
  }, [paragraphId]);

  const handleAddOrEdit = () => {
    setEditingNote(note);
    setIsEditing(true);
  };

  const handleSave = () => {
    localStorage.setItem(paragraphId, editingNote);
    setNote(editingNote);
    setIsEditing(false);
  };

  const handleDelete = () => {
    localStorage.removeItem(paragraphId);
    setNote('');
    setEditingNote('');
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingNote('');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="mt-4">
        <textarea
          value={editingNote}
          onChange={(e) => setEditingNote(e.target.value)}
          className="w-full bg-input border border-border rounded-md p-3 text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          rows={4}
          placeholder="Escribe tu nota personal aquí..."
          aria-label="Área de edición de nota"
        />
        <div className="flex justify-end space-x-2 mt-2">
          <button
            onClick={handleCancel}
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
        </div>
      </div>
    );
  }

  if (note) {
    return (
      <div className="mt-4 p-4 bg-accent/50 border border-border rounded-lg relative group">
        <p className="text-accent-foreground whitespace-pre-wrap">{note}</p>
        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={handleAddOrEdit} className="p-1.5 rounded-full bg-card hover:bg-muted text-muted-foreground" aria-label="Editar nota">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L16.732 3.732z" />
            </svg>
          </button>
          <button onClick={handleDelete} className="p-1.5 rounded-full bg-card hover:bg-muted text-muted-foreground" aria-label="Borrar nota">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-3 text-right">
      <button
        onClick={handleAddOrEdit}
        className="text-sm text-primary hover:underline"
      >
        + Añadir nota
      </button>
    </div>
  );
};

export default ParagraphNotes;