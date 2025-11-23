import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '🧘',
      title: 'Sessões de Foco',
      description: 'Técnicas de concentração profunda com timer personalizado e acompanhamento',
    },
    {
      icon: '📊',
      title: 'Análise de Sentimentos',
      description: 'Monitore seu estado emocional e identifique padrões de bem-estar',
    },
    {
      icon: '🏆',
      title: 'Sistema de Conquistas',
      description: 'Desbloqueie badges e acompanhe sua evolução na jornada',
    },
    {
      icon: '🌬️',
      title: 'Exercícios de Respiração',
      description: 'Técnicas guiadas para reduzir ansiedade e aumentar foco',
    },
    {
      icon: '📈',
      title: 'Relatórios Detalhados',
      description: 'Visualize estatísticas e progresso ao longo do tempo',
    },
    {
      icon: '⚡',
      title: 'Gamificação',
      description: 'Sistema de pontos, níveis e recompensas por consistência',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-focus">

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-breathe"></div>
        
        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-3 text-7xl animate-float">
              🧠
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold text-foreground">
              Bem-vindo ao <span className="bg-gradient-primary bg-clip-text text-transparent">ZenSoft</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Sua plataforma inteligente para cuidar da saúde mental, aumentar produtividade e cultivar bem-estar no dia a dia profissional
            </p>

            <div className="flex gap-4 justify-center flex-wrap pt-8">
              <Button size="lg" onClick={() => navigate('/auth')}>
                Começar Agora
              </Button>
              <Button variant="secondary" size="lg" onClick={() => {
                document.getElementById('como-funciona')?.scrollIntoView({ behavior: 'smooth' });
              }}>
                Como Funciona
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Como Funciona
            </h2>
            <p className="text-xl text-muted-foreground">
              Transforme sua rotina em 4 passos simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { numero: '1', titulo: 'Cadastre-se', descricao: 'Crie sua conta gratuitamente' },
              { numero: '2', titulo: 'Configure', descricao: 'Personalize suas metas e preferências' },
              { numero: '3', titulo: 'Pratique', descricao: 'Use sessões de foco e respiração' },
              { numero: '4', titulo: 'Evolua', descricao: 'Acompanhe progresso e conquistas' },
            ].map((passo) => (
              <Card key={passo.numero} variant="gradient" className="text-center hover:scale-105 transition-transform">
                <div className="w-16 h-16 rounded-full bg-gradient-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4 animate-pulse-glow">
                  {passo.numero}
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">{passo.titulo}</h3>
                <p className="text-muted-foreground">{passo.descricao}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Funcionalidades
            </h2>
            <p className="text-xl text-muted-foreground">
              Tudo que você precisa para cuidar do seu bem-estar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-glow transition-all duration-300">
                <div className="text-5xl mb-4 animate-float">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <Card variant="glow" className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Por que usar o ZenSoft?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Para Profissionais</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Aumente produtividade</li>
                  <li>• Reduza estresse</li>
                  <li>• Melhore foco</li>
                  <li>• Equilibre vida pessoal</li>
                </ul>
              </div>

              <div>
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Baseado em Ciência</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Técnica Pomodoro</li>
                  <li>• Mindfulness</li>
                  <li>• Psicologia positiva</li>
                  <li>• Neurociência aplicada</li>
                </ul>
              </div>

              <div>
                <div className="text-4xl mb-4">📱</div>
                <h3 className="text-xl font-bold mb-3 text-foreground">Fácil de Usar</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Interface intuitiva</li>
                  <li>• Acesso rápido</li>
                  <li>• Sem complexidade</li>
                  <li>• Totalmente gratuito</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-foreground mb-6">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Junte-se a milhares de profissionais que já cuidam da saúde mental com o ZenSoft
          </p>
          <Button size="lg" onClick={() => navigate('/auth')}>
            Criar Conta Grátis →
          </Button>
        </div>
      </section>


      <footer className="border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p className="text-4xl mb-4">🧠</p>
          <p className="mb-2">© 2025 ZenSoft. Todos os direitos reservados.</p>
          <p className="text-sm">Cuidando do bem-estar mental de profissionais modernos.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;