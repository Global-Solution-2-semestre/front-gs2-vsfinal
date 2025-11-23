import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { api } from '../services/api';
import { SessaoFoco } from '../types';

const Sessoes = () => {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [sessoes, setSessoes] = useState<SessaoFoco[]>([]);
  const [sessaoAtiva, setSessaoAtiva] = useState(false);
  const [sessaoAtualId, setSessaoAtualId] = useState<number | null>(null);
  const [tipoSessao, setTipoSessao] = useState<'foco' | 'respiracao' | 'pausa'>('foco');
  const [tempo, setTempo] = useState(25 * 60);
  const [tempoRestante, setTempoRestante] = useState(tempo);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!usuario) {
      navigate('/auth');
      return;
    }
    carregarSessoes();
  }, [usuario, navigate]);

  useEffect(() => {
    let interval: number;

    if (sessaoAtiva && tempoRestante > 0) {
      interval = window.setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0) {
      finalizarSessao();
    }

    return () => clearInterval(interval);
  }, [sessaoAtiva, tempoRestante]);

  const carregarSessoes = async () => {
    try {
      const data = await api.getSessoes();
      const minhasSessoes = data.filter((s: SessaoFoco) => s.usuarioId === usuario?.id);
      setSessoes(minhasSessoes.sort((a: SessaoFoco, b: SessaoFoco) => 
        new Date(b.dataInicio).getTime() - new Date(a.dataInicio).getTime()
      ));
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
    }
  };

  const iniciarSessao = async (tipo: 'foco' | 'respiracao' | 'pausa') => {
    if (!usuario) return;

    const tempos = {
      foco: 25 * 60,
      respiracao: 5 * 60,
      pausa: 5 * 60,
    };

    setTipoSessao(tipo);
    setTempo(tempos[tipo]);
    setTempoRestante(tempos[tipo]);

    try {
      setLoading(true);
      const novaSessao = await api.criarSessao({
        usuarioId: usuario.id,
        dataInicio: new Date().toISOString(),
        tipo: tipo,
      });
      setSessaoAtualId(novaSessao.id);
      setSessaoAtiva(true);
    } catch (error) {
      console.error('Erro ao iniciar sessão:', error);
      alert('Erro ao iniciar sessão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const pausarSessao = () => {
    setSessaoAtiva(false);
  };

  const continuarSessao = () => {
    setSessaoAtiva(true);
  };

  const cancelarSessao = async () => {
    if (sessaoAtualId) {
      try {
        await api.deletarSessao(sessaoAtualId);
      } catch (error) {
        console.error('Erro ao cancelar sessão:', error);
      }
    }
    setSessaoAtiva(false);
    setTempoRestante(tempo);
    setSessaoAtualId(null);
  };

  const finalizarSessao = async () => {
    if (!sessaoAtualId) return;

    try {
      const duracaoTotal = tempo;
      await api.atualizarSessao(sessaoAtualId, {
        dataFim: new Date().toISOString(),
        duracao: duracaoTotal,
        notaQualidade: 5,
      });

      setSessaoAtiva(false);
      setTempoRestante(tempo);
      setSessaoAtualId(null);
      carregarSessoes();
      alert('🎉 Sessão concluída! Parabéns!');
    } catch (error) {
      console.error('Erro ao finalizar sessão:', error);
    }
  };

  const deletarSessao = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar esta sessão?')) return;

    try {
      await api.deletarSessao(id);
      carregarSessoes();
    } catch (error) {
      console.error('Erro ao deletar sessão:', error);
      alert('Erro ao deletar sessão');
    }
  };

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progresso = ((tempo - tempoRestante) / tempo) * 100;

  if (sessaoAtiva || tempoRestante !== tempo) {
    return (
      <div className="min-h-screen bg-gradient-focus">
      <Header />
        
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
          <Card variant="glow" className="text-center space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">
                {tipoSessao === 'foco' && '🧘 Sessão de Foco Profundo'}
                {tipoSessao === 'respiracao' && '🌬️ Exercício de Respiração'}
                {tipoSessao === 'pausa' && '☕ Pausa Ativa'}
              </h1>
              <p className="text-lg text-muted-foreground">
                {tipoSessao === 'foco' && 'Concentre-se em uma única tarefa'}
                {tipoSessao === 'respiracao' && 'Respire fundo e relaxe'}
                {tipoSessao === 'pausa' && 'Recarregue suas energias'}
              </p>
            </div>

            <div className="relative">
              <div className="w-64 h-64 mx-auto rounded-full bg-gradient-primary flex items-center justify-center animate-breathe">
                <div className="w-56 h-56 rounded-full bg-card flex items-center justify-center">
                  <span className="text-6xl font-bold text-foreground">{formatarTempo(tempoRestante)}</span>
                </div>
              </div>

              <svg className="absolute inset-0 w-64 h-64 mx-auto -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--secondary))" strokeWidth="4" />
                <circle
                  cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="4"
                  strokeDasharray={`${progresso * 2.827} 282.7`} strokeLinecap="round"
                  className="transition-all duration-300"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div className="flex justify-center gap-4 flex-wrap">
              {sessaoAtiva ? (
                <Button size="lg" onClick={pausarSessao}>⏸️ Pausar</Button>
              ) : (
                <Button size="lg" onClick={continuarSessao}>▶️ Continuar</Button>
              )}
              <Button variant="secondary" size="lg" onClick={cancelarSessao}>⏹️ Cancelar</Button>
            </div>

            <Card className="mt-8">
              <h3 className="font-bold text-lg mb-3 text-foreground">💡 Dicas para esta sessão</h3>
              <ul className="text-left text-muted-foreground space-y-2">
                {tipoSessao === 'foco' && (
                  <>
                    <li>• Elimine todas as distrações</li>
                    <li>• Foque em apenas uma tarefa</li>
                    <li>• Mantenha água por perto</li>
                  </>
                )}
                {tipoSessao === 'respiracao' && (
                  <>
                    <li>• Inspire profundamente pelo nariz</li>
                    <li>• Expire lentamente pela boca</li>
                    <li>• Mantenha os ombros relaxados</li>
                  </>
                )}
                {tipoSessao === 'pausa' && (
                  <>
                    <li>• Levante e estique o corpo</li>
                    <li>• Hidrate-se</li>
                    <li>• Olhe para longe da tela</li>
                  </>
                )}
              </ul>
            </Card>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-focus">
      <Header />
      
      <main className="max-w-6xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            🧘 <span className="bg-gradient-primary bg-clip-text text-transparent">Sessões de Foco</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Escolha o tipo de sessão e comece sua jornada de bem-estar
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card variant="gradient" className="hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-float">🧘</div>
              <h2 className="text-2xl font-bold text-foreground">Foco Profundo</h2>
              <p className="text-muted-foreground">25 minutos de concentração intensa</p>
              <Button 
                className="w-full" 
                onClick={() => iniciarSessao('foco')}
                disabled={loading}
              >
                Iniciar Sessão
              </Button>
            </div>
          </Card>

          <Card variant="gradient" className="hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-float">🌬️</div>
              <h2 className="text-2xl font-bold text-foreground">Respiração</h2>
              <p className="text-muted-foreground">5 minutos de exercícios guiados</p>
              <Button 
                className="w-full" 
                onClick={() => iniciarSessao('respiracao')}
                disabled={loading}
              >
                Iniciar Sessão
              </Button>
            </div>
          </Card>

          <Card variant="gradient" className="hover:scale-105 transition-all duration-300">
            <div className="text-center space-y-4">
              <div className="text-6xl animate-float">☕</div>
              <h2 className="text-2xl font-bold text-foreground">Pausa Ativa</h2>
              <p className="text-muted-foreground">5 minutos para recarregar</p>
              <Button 
                className="w-full" 
                onClick={() => iniciarSessao('pausa')}
                disabled={loading}
              >
                Iniciar Sessão
              </Button>
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Histórico de Sessões</h2>
          {sessoes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">
                Você ainda não tem sessões registradas
              </p>
              <p className="text-sm text-muted-foreground">
                Clique em um dos cards acima para iniciar sua primeira sessão
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sessoes.map((sessao) => (
                <div 
                  key={sessao.id}
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
                        {' • '}
                        {new Date(sessao.dataInicio).toLocaleDateString()} às{' '}
                        {new Date(sessao.dataInicio).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {sessao.notaQualidade && (
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < sessao.notaQualidade! ? 'text-warning' : 'text-muted'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    )}
                    <button
                      onClick={() => deletarSessao(sessao.id!)}
                      className="ml-4 px-3 py-1 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm transition-colors"
                    >
                      Deletar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

export default Sessoes;