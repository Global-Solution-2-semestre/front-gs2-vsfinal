import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import Header from '../components/Header';
import Card from '../components/Card';
import Button from '../components/Button';

export default function Perfil() {
  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  useEffect(() => {
    if (!usuario) {
      navigate('/auth');
    }
  }, [usuario, navigate]);

  if (!usuario) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-focus">
      <Header />

      <main className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <Card variant="glow" className="mb-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center text-6xl animate-breathe">
              👤
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-foreground">{usuario.nome}</h1>
              <p className="text-lg text-muted-foreground">{usuario.email}</p>

              <div className="flex items-center gap-4 pt-4 justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="text-xl font-bold text-foreground">
                    Nível {usuario.nivel || 1}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl">💎</span>
                  <span className="text-xl font-bold text-foreground">
                    {usuario.pontuacao || 0} pts
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={() => navigate('/dashboard')}>
                Voltar ao Dashboard
              </Button>

              <Button
                variant="secondary"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
              >
                Sair
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-2xl font-bold mb-4 text-foreground">Informações da Conta</h2>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground">Nome</label>
              <p className="text-lg font-semibold text-foreground">{usuario.nome}</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <p className="text-lg font-semibold text-foreground">{usuario.email}</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground">ID de Usuário</label>
              <p className="text-lg font-semibold text-foreground">#{usuario.id}</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
