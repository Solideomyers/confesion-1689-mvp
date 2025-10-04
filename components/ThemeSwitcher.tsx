import React, { useState, useRef, useEffect } from 'react';

interface ThemeSwitcherProps {
  onThemeChange: (theme: string) => void;
  currentTheme: string;
  direction?: 'up' | 'down';
}

const themes = [
  { id: 'light-theme', name: 'Modo Claro' },
  { id: 'dark-matter', name: 'Materia Oscura' },
  { id: 'midnight-blue', name: 'Azul Medianoche' },
  { id: 'slate-gray', name: 'Gris Pizarra' },
];

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange, currentTheme, direction = 'up' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };
  
  const menuPositionClass = direction === 'up' 
    ? 'bottom-full right-0 mb-2' 
    : 'top-full right-0 mt-2';

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
        aria-label="Cambiar tema"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute w-48 bg-popover border border-border rounded-lg shadow-lg py-1 z-30 ${menuPositionClass}`}>
          {themes.map(theme => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`w-full text-left px-4 py-2 text-sm ${
                currentTheme === theme.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-popover-foreground hover:bg-accent'
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;