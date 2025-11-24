import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';
import { api } from '../services/api';
import {type Sentimento } from '../types';

export default function Sentimentos() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [sentimentos, setSentimentos] = useState<Sentimento[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    tipo: 'neutro' as Sentimento['tipo'],
    intensidade: 3,
    observacoes: '',
  });

  useEffect(() => {
    if (!usuario) {
      navigate('/auth');
      return;
    }
    carregarSentimentos();
  }, [usuario, navigate]);

  const carregarSentimentos = async () => {
    try {
      const data = await api.getSentimentos();
      const meusSentimentos = data.filter((s: Sentimento) => s.usuarioId === usuario?.id);
      setSentimentos(
        meusSentimentos.sort(
          (a: Sentimento, b: Sentimento) =>
            new Date(b.dataRegistro).getTime() - new Date(a.dataRegistro).getTime()
        )
      );
    } catch (error) {
      console.error('Erro ao carregar sentimentos:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usuario) return;

    setLoading(true);
    try {
      if (editando) {
        await api.atualizarSentimento(editando, {
          ...formData,
          usuarioId: usuario.id,
          dataRegistro: new Date().toISOString(),
        });
      } else {
        await api.criarSentimento({
          ...formData,
          usuarioId: usuario.id,
          dataRegistro: new Date().toISOString(),
        });
      }

      setFormData({ tipo: 'neutro', intensidade: 3, observacoes: '' });
      setShowForm(false);
      setEditando(null);
      carregarSentimentos();
    } catch (error) {
      console.error('Erro ao salvar sentimento:', error);
      alert('Erro ao salvar sentimento');
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (sentimento: Sentimento) => {
    setFormData({
      tipo: sentimento.tipo,
      intensidade: sentimento.intensidade,
      observacoes: sentimento.observacoes || '',
    });
    setEditando(sentimento.id!);
    setShowForm(true);
  };

  const handleDeletar = async (id: number) => {
    if (!confirm('Tem certeza que deseja deletar este registro?')) return;

    try {
      await api.deletarSentimento(id);
      carregarSentimentos();
    } catch (error) {
      console.error('Erro ao deletar sentimento:', error);
      alert('Erro ao deletar sentimento');
    }
  };

  const cancelarEdicao = () => {
    setFormData({ tipo: 'neutro', intensidade: 3, observacoes: '' });
    setShowForm(false);
    setEditando(null);
  };

  const emojiMap = {
    feliz: '😊',
    calmo: '😌',
    neutro: '😐',
    ansioso: '😰',
    estressado: '😓',
    focado: '🎯',
  };

  return (
    <div className="min-h-screen bg-gradient-focus">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            💭 <span className="bg-gradient-primary bg-clip-text text-transparent">Diário de Sentimentos</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Registre e acompanhe seu estado emocional
          </p>
        </div>

        {!showForm && (
          <div className="mb-8 text-center">
            <Button onClick={() => setShowForm(true)}>Registrar Novo Sentimento</Button>
          </div>
        )}

        {showForm && (
          <Card variant="glow" className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-foreground">
              {editando ? 'Editar Sentimento' : 'Como você está se sentindo?'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-4">
                  Selecione seu sentimento
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(emojiMap).map(([tipo, emoji]) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => setFormData({ ...formData, tipo: tipo as Sentimento['tipo'] })}
                      className={`
                        p-6 rounded-xl border-2 transition-all duration-300
                        ${formData.tipo === tipo ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}
                      `}
                    >
                      <div className="text-4xl mb-2">{emoji}</div>
                      <div className="font-semibold capitalize text-foreground">{tipo}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Intensidade: {formData.intensidade}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={formData.intensidade}
                  onChange={(e) => setFormData({ ...formData, intensidade: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Baixa</span>
                  <span>Alta</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Observações (opcional)
                </label>
                <textarea
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  placeholder="Descreva o que você está sentindo..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border-2 border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-card text-foreground"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Salvando...' : editando ? 'Atualizar' : 'Salvar Sentimento'}
                </Button>
                <Button type="button" variant="secondary" onClick={cancelarEdicao}>
                  Cancelar
                </Button>
              </div>
            </form>
          </Card>
        )}

        <Card>
          <h2 className="text-2xl font-bold mb-6 text-foreground">Histórico</h2>
          {sentimentos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Você ainda não registrou nenhum sentimento</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sentimentos.map((sentimento) => (
                <div key={sentimento.id} className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
                  <div className="text-4xl">{emojiMap[sentimento.tipo]}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-foreground capitalize">{sentimento.tipo}</h3>
                      <span className="text-sm text-muted-foreground">
                        {new Date(sentimento.dataRegistro).toLocaleDateString()} às{' '}
                        {new Date(sentimento.dataRegistro).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-muted-foreground">Intensidade:</span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i < sentimento.intensidade ? 'bg-primary' : 'bg-muted'}`}
                          />
                        ))}
                      </div>
                    </div>
                    {sentimento.observacoes && (
                      <p className="text-sm text-muted-foreground mt-2 mb-3">"{sentimento.observacoes}"</p>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditar(sentimento)}
                        className="px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletar(sentimento.id!)}
                        className="px-3 py-1 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive text-sm transition-colors"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
