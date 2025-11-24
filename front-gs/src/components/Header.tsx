import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/UserContext';

export default function Header() {
  const location = useLocation();
  const { logout } = useAuth();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: '🏠' },
    { to: '/sessoes', label: 'Sessões', icon: '🧘' },
    { to: '/sentimentos', label: 'Sentimentos', icon: '💭' },
    { to: '/conquistas', label: 'Conquistas', icon: '🏆' },
    { to: '/perfil', label: 'Perfil', icon: '👤' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-foreground">
            <span className="text-3xl">🧠</span>
            <span className="bg-gradient-primary bg-clip-text text-transparent">ZenSoft</span>
          </Link>

          <div className="flex gap-2">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`
                    px-4 py-2 rounded-full transition-all duration-300
                    ${isActive 
                      ? 'bg-gradient-primary text-primary-foreground shadow-glow' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                    }
                  `}
                >
                  <span className="mr-2">{link.icon}</span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
