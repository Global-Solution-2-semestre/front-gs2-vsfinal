import { useState } from 'react';
import Header from '../components/Header';
import Card from '../components/Card';
import Badge from '../components/Badge';
import { Conquista } from '../types';

const Conquistas = () => {
  const [conquistasFiltro, setConquistasFiltro] = useState<'todas' | 'desbloqueadas' | 'bloqueadas'>('todas');

  const conquistas: Conquista[] = [
    {
      id: '1',
      titulo: 'Primeiro Passo',
      descricao: 'Complete sua primeira sessão de foco',
      icone: '🌱',
      desbloqueada: true,
    },
    {
      id: '2',
      titulo: 'Sequência Iniciante',
      descricao: 'Mantenha uma sequência de 7 dias',
      icone: '🔥',
      desbloqueada: true,
    },
    {
      id: '3',
      titulo: 'Mestre do Foco',
      descricao: 'Complete 50 sessões de foco',
      icone: '🧘',
      desbloqueada: true,
      progresso: 50,
      meta: 50,
    },
    {
      id: '4',
      titulo: 'Respiração Zen',
      descricao: 'Complete 100 exercícios de respiração',
      icone: '🌬️',
      desbloqueada: false,
      progresso: 73,
      meta: 100,
    },
    {
      id: '5',
      titulo: 'Maratonista Mental',
      descricao: 'Acumule 100 horas de foco total',
      icone: '⏰',
      desbloqueada: false,
      progresso: 87,
      meta: 100,
    },
    {
      id: '6',
      titulo: 'Equilibrista',
      descricao: 'Mantenha equilíbrio perfeito por 30 dias',
      icone: '⚖️',
      desbloqueada: false,
      progresso: 23,
      meta: 30,
    },
    {
      id: '7',
      titulo: 'Guardião da Paz',
      descricao: 'Complete 200 sessões de meditação',
      icone: '☮️',
      desbloqueada: false,
      progresso: 45,
      meta: 200,
    },
    {
      id: '8',
      titulo: 'Lenda Zen',
      descricao: 'Atinja o nível máximo',
      icone: '👑',
      desbloqueada: false,
      progresso: 8,
      meta: 50,
    },
  ];

  const conquistasFiltradas = conquistas.filter(c => {
    if (conquistasFiltro === 'todas') return true;
    if (conquistasFiltro === 'desbloqueadas') return c.desbloqueada;
    return !c.desbloqueada;
  });

  const totalDesbloqueadas = conquistas.filter(c => c.desbloqueada).length;
  const percentualCompleto = Math.round((totalDesbloqueadas / conquistas.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-focus">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
    
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            🏆 <span className="bg-gradient-primary bg-clip-text text-transparent">Conquistas</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Acompanhe seu progresso e desbloqueie novas conquistas
          </p>
        </div>

  
        <Card variant="glow" className="mb-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-primary text-primary-foreground text-5xl font-bold animate-breathe">
              {percentualCompleto}%
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {totalDesbloqueadas} de {conquistas.length} Conquistas
            </h2>
            <div className="max-w-md mx-auto">
              <div className="w-full bg-secondary rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-primary h-full transition-all duration-500"
                  style={{ width: `${percentualCompleto}%` }}
                />
              </div>
            </div>
          </div>
        </Card>


        <div className="flex justify-center gap-2 mb-8">
          {[
            { value: 'todas', label: 'Todas' },
            { value: 'desbloqueadas', label: 'Desbloqueadas' },
            { value: 'bloqueadas', label: 'Bloqueadas' },
          ].map((filtro) => (
            <button
              key={filtro.value}
              onClick={() => setConquistasFiltro(filtro.value as any)}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300
                ${conquistasFiltro === filtro.value
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }
              `}
            >
              {filtro.label}
            </button>
          ))}
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {conquistasFiltradas.map((conquista) => (
            <Badge key={conquista.id} conquista={conquista} />
          ))}
        </div>

        {conquistasFiltradas.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              Nenhuma conquista encontrada nesta categoria
            </p>
          </Card>
        )}
      </main>
    </div>
  );
};

export default Conquistas;