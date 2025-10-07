
import React, { useState } from 'react';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ tags, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      e.preventDefault();
      const newTag = inputValue.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        onChange([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 items-center bg-input border border-border p-2 rounded-md">
        {tags.map(tag => (
          <span key={tag} className="flex items-center gap-1.5 bg-secondary text-secondary-foreground text-sm font-medium px-2.5 py-1 rounded-full">
            {tag}
            <button onClick={() => removeTag(tag)} className="text-secondary-foreground/70 hover:text-secondary-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Añadir etiquetas..." : "Añadir más..."}
          className="bg-transparent flex-grow p-1 focus:outline-none text-sm"
        />
      </div>
    </div>
  );
};

export default TagInput;