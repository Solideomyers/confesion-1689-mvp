import React, { useRef, useEffect, useState } from 'react';
import type { ReadingSettings } from '../types';

interface ReadingSettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  onSettingChange: <K extends keyof ReadingSettings>(key: K, value: ReadingSettings[K]) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

type FontSize = ReadingSettings['fontSize'];
type LineHeight = ReadingSettings['lineHeight'];
type FontFamily = ReadingSettings['fontFamily'];

const fontSizes: { value: FontSize; label: string }[] = [
  { value: 'base', label: 'Pequeño' },
  { value: 'lg', label: 'Normal' },
  { value: 'xl', label: 'Grande' },
  { value: '2xl', label: 'Extra' },
];

const lineHeights: { value: LineHeight; label: string }[] = [
  { value: 'normal', label: 'Compacto' },
  { value: 'relaxed', label: 'Normal' },
  { value: 'loose', label: 'Amplio' },
];

const fontFamilies: { value: FontFamily; label: string }[] = [
  { value: 'serif', label: 'Serif' },
  { value: 'sans', label: 'Sans' },
];

const SettingButton = <T extends string>({ value, label, currentValue, onClick }: { value: T, label: string, currentValue: T, onClick: (value: T) => void }) => (
  <button
    onClick={() => onClick(value)}
    className={`w-full px-3 py-1.5 text-sm rounded-md transition-colors ${
      currentValue === value
        ? 'bg-primary text-primary-foreground'
        : 'bg-muted/50 hover:bg-muted text-muted-foreground'
    }`}
  >
    {label}
  </button>
);

const ReadingSettingsPopover: React.FC<ReadingSettingsPopoverProps> = ({ isOpen, onClose, settings, onSettingChange, triggerRef }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const popoverHeight = 250; 
      
      let top = triggerRect.bottom + 8;
      if (triggerRect.top > window.innerHeight / 2) { 
        top = triggerRect.top - popoverHeight - 8;
      }

      const left = triggerRect.left + triggerRect.width / 2;
      setPosition({ top, left });
    }
  }, [isOpen, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 w-64 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg p-4"
      style={{ top: `${position.top}px`, left: `${position.left}px`, transform: 'translateX(-50%)' }}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Tamaño de Fuente</label>
          <div className="grid grid-cols-2 gap-2">
            {fontSizes.map(fs => (
              <SettingButton key={fs.value} {...fs} currentValue={settings.fontSize} onClick={(v) => onSettingChange('fontSize', v)} />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Interlineado</label>
          <div className="grid grid-cols-3 gap-2">
             {lineHeights.map(lh => (
              <SettingButton key={lh.value} {...lh} currentValue={settings.lineHeight} onClick={(v) => onSettingChange('lineHeight', v)} />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Tipografía</label>
          <div className="grid grid-cols-2 gap-2">
            {fontFamilies.map(ff => (
              <SettingButton key={ff.value} {...ff} currentValue={settings.fontFamily} onClick={(v) => onSettingChange('fontFamily', v)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingSettingsPopover;