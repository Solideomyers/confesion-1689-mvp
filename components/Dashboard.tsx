
import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

interface DashboardProps {
  stats: {
    readingProgress: number;
    bookmarkCount: number;
    noteCount: number;
    highlightCount: number;
  };
  onExportData: () => void;
  onDeleteAllData: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-card border border-border rounded-lg p-6 flex items-center">
    <div className="p-3 rounded-full bg-primary/10 text-primary mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </div>
  </div>
);


const Dashboard: React.FC<DashboardProps> = ({ stats, onExportData, onDeleteAllData }) => {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    
    const handleDeleteClick = () => {
        setIsConfirmOpen(true);
    };

    const handleConfirmDelete = () => {
        onDeleteAllData();
        setIsConfirmOpen(false);
    };

    return (
        <main className="p-4 sm:p-8 pt-24 max-w-5xl mx-auto">
            <header className="mb-10">
                <h1 className="text-4xl font-bold font-serif text-foreground">Panel de Control</h1>
                <p className="mt-2 text-muted-foreground">Revisa tus estadísticas y gestiona los datos de tu aplicación.</p>
            </header>

            <section>
                <h2 className="text-2xl font-semibold font-serif mb-4">Estadísticas de Estudio</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard 
                        title="Progreso de Lectura" 
                        value={`${stats.readingProgress}%`}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>}
                    />
                    <StatCard 
                        title="Marcadores" 
                        value={stats.bookmarkCount}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>}
                    />
                    <StatCard 
                        title="Notas Personales" 
                        value={stats.noteCount}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
                    />
                    <StatCard 
                        title="Resaltados" 
                        value={stats.highlightCount}
                        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>}
                    />
                </div>
            </section>

            <section className="mt-12">
                <h2 className="text-2xl font-semibold font-serif mb-4">Configuración de Datos</h2>
                <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Exportar mis Datos</h3>
                            <p className="text-muted-foreground mt-1 text-sm max-w-md">Descarga una copia de seguridad de todos tus marcadores, notas y resaltados en un archivo JSON.</p>
                        </div>
                        <button 
                            onClick={onExportData}
                            className="mt-3 sm:mt-0 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90 transition-colors font-semibold"
                        >
                            Exportar Datos
                        </button>
                    </div>
                    <div className="border-t border-border my-6"></div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                         <div>
                            <h3 className="text-lg font-bold text-destructive">Borrar Todos los Datos</h3>
                            <p className="text-muted-foreground mt-1 text-sm max-w-md">
                                Esta acción eliminará permanentemente todos tus marcadores, notas, resaltados y preferencias de este navegador. No se puede deshacer.
                            </p>
                        </div>
                        <button
                            onClick={handleDeleteClick}
                            className="mt-3 sm:mt-0 px-4 py-2 bg-destructive/20 text-destructive rounded-md hover:bg-destructive/30 transition-colors font-semibold"
                        >
                            Borrar Datos
                        </button>
                    </div>
                </div>
            </section>

            <ConfirmationModal 
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="¿Estás absolutamente seguro?"
                message="Esta acción eliminará permanentemente todos tus datos de la aplicación. No podrás recuperarlos."
            />
        </main>
    );
};

export default Dashboard;