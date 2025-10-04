
import React from 'react';
import type { Chapter } from '../types';

interface HomeProps {
  chapters: Chapter[];
  onSelectChapter: (index: number) => void;
}

const Home: React.FC<HomeProps> = ({ chapters, onSelectChapter }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8">
      <header className="text-center max-w-3xl mx-auto my-12">
        <h1 className="text-5xl md:text-6xl font-bold font-serif text-foreground">
          La Confesión de Fe Bautista de 1689
        </h1>
        <p className="mt-6 text-lg text-muted-foreground font-sans">
          Una herramienta de estudio digital para explorar la Segunda Confesión de Fe Bautista de Londres. Navega por los capítulos, lee las Escrituras de prueba, toma notas y guarda tus párrafos favoritos.
        </p>
        <button 
          onClick={() => onSelectChapter(0)}
          className="mt-8 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105"
        >
          Empezar a Leer
        </button>
      </header>
      
      <main className="w-full max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl font-bold font-serif text-center mb-8">Índice de Capítulos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {chapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => onSelectChapter(index)}
              className={`
                text-left p-6 rounded-lg border border-border bg-card
                transition-all duration-300 ease-in-out transform hover:-translate-y-2
                inverted-corner relative group
                ${index === 0 ? 'sm:col-span-2 md:col-span-3 lg:col-span-4' : ''}
              `}
            >
              <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      {chapter.chapter === 0 ? 'Prefacio' : `Capítulo ${chapter.chapter}`}
                    </p>
                    <p className="font-bold text-xl font-serif mt-2 text-foreground">
                      {chapter.title}
                    </p>
                  </div>
                  <div className="text-right mt-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
