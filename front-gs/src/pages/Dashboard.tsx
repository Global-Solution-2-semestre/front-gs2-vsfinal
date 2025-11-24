import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

import StatCard from '../components/StatCard';
import Card from '../components/Card';
import Button from '../components/Button';
import { api }  from '../services/api';
import {type  SessaoFoco, type Sentimento } from '../types';
import  Header  from '../components/Header';

export default function Dashboard() {
  const navigate = useNavigate();
  const { usuario, isLoading } = useAuth();
  const [sessoes, setSessoes] = useState<SessaoFoco[]>([]);
  const [sentimentos, setSentimentos] = useState<Sentimento[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!isLoading && !usuario) {
      navigate('/auth');
    }
  }, [usuario, isLoading, navigate]);

  useEffect(() => {
    if (usuario) {
      carregarDados();
    }
  }, [usuario]);

  const carregarDados = async () => {
    try {
      const [sessoesData, sentimentosData] = await Promise.all([
        api.getSessoes(),
        api.getSentimentos(),
      ]);

      const minhasSessoes = sessoesData.filter((s: SessaoFoco) => s.usuarioId === usuario?.id);
      const meusSentimentos = sentimentosData.filter((s: Sentimento) => s.usuarioId === usuario?.id);

      setSessoes(minhasSessoes);
      setSentimentos(meusSentimentos);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const registrarSentimento = async (tipo: string, intensidade: number) => {
    if (!usuario) return;

    try {
      await api.criarSentimento({
        usuarioId: usuario.id,
        tipo,
        intensidade,
        dataRegistro: new Date().toISOString(),
      });
      carregarDados();
    } catch (error) {
      console.error('Erro ao registrar sentimento:', error);
    }
  };

  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-focus flex items-center justify-center">
        <div className="animate-breathe text-6xl">🧠</div>
      </div>
    );
  }

  const totalHoras = Math.floor(
    sessoes.reduce((acc, s) => acc + (s.duracao || 0), 0) / 3600
  );

  const sessoesHoje = sessoes.filter(s => {
    const hoje = new Date().toDateString();
    return new Date(s.dataInicio).toDateString() === hoje;
  }).length;

  return (
    <div className="min-h-screen bg-gradient-focus">
      <Header />

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">

        <div className="mb-12 text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            Olá, <span className="bg-gradient-primary bg-clip-text text-transparent">{usuario?.nome}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Como está seu dia hoje?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard icon="⏱️" label="Total de Horas" value={`${totalHoras}h`} variant="gradient" />
          <StatCard icon="🎯" label="Sessões Hoje" value={sessoesHoje} />
          <StatCard icon="🏆" label="Nível" value={usuario?.nivel || 1} />
          <StatCard icon="💎" label="Pontuação" value={usuario?.pontuacao || 0} />
        </div>

        <Card variant="glow" className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => navigate('/sessoes')}
              className="p-6 rounded-xl bg-gradient-primary text-primary-foreground hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-3">🧘</div>
              <h3 className="font-bold text-lg">Nova Sessão</h3>
            </button>

            <button
              onClick={() => navigate('/sentimentos')}
              className="p-6 rounded-xl bg-gradient-wellness text-accent-foreground hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-3">💭</div>
              <h3 className="font-bold text-lg">Registrar Sentimento</h3>
            </button>

            <button
              onClick={() => navigate('/conquistas')}
              className="p-6 rounded-xl bg-success text-success-foreground hover:scale-105 transition-all duration-300"
            >
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-lg">Ver Conquistas</h3>
            </button>
          </div>
        </Card>

        <Card className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Como você está se sentindo agora?</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { emoji: '😊', label: 'feliz', intensidade: 5 },
              { emoji: '😌', label: 'calmo', intensidade: 4 },
              { emoji: '😐', label: 'neutro', intensidade: 3 },
              { emoji: '😰', label: 'ansioso', intensidade: 2 },
              { emoji: '😓', label: 'estressado', intensidade: 1 },
            ].map((mood) => (
              <button
                key={mood.label}
                onClick={() => registrarSentimento(mood.label, mood.intensidade)}
                className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-secondary transition-all duration-300 hover:scale-110"
              >
                <span className="text-4xl">{mood.emoji}</span>
                <span className="text-sm text-muted-foreground capitalize">{mood.label}</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Atividade Recente</h2>
          {sessoes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Você ainda não tem sessões registradas
              </p>
              <Button onClick={() => navigate('/sessoes')}>
                Iniciar Primeira Sessão
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {sessoes.slice(0, 5).map((sessao, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">
                      {sessao.tipo === 'foco' && '🧘'}
                      {sessao.tipo === 'respiracao' && '🌬️'}
                      {sessao.tipo === 'pausa' && '☕'}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground capitalize">{sessao.tipo}</h3>
                      <p className="text-sm text-muted-foreground">
                        {sessao.duracao ? `${Math.floor(sessao.duracao / 60)} min` : 'Em andamento'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {new Date(sessao.dataInicio).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

      </main>
    </div>
  );
}
