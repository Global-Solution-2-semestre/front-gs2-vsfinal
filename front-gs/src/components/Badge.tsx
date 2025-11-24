import Card from './Card';
import { type Conquista } from '../types';

interface BadgeProps {
  conquista: Conquista;
  onClick?: () => void;
}

export default function Badge({ conquista, onClick }: BadgeProps) {
  const { titulo, descricao, icone, desbloqueada, progresso, meta } = conquista;

  return (
    <Card
      variant={desbloqueada ? 'glow' : 'default'}
      className={`
        cursor-pointer hover:scale-105 transition-all duration-300
        ${!desbloqueada && 'opacity-50 grayscale'}
      `}
      onClick={onClick}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`text-6xl ${desbloqueada && 'animate-bounce'}`}>
          {icone}
        </div>

        <h3 className="font-bold text-lg text-foreground">{titulo}</h3>
        <p className="text-sm text-muted-foreground">{descricao}</p>

        {progresso !== undefined && meta && (
          <div className="w-full space-y-1">
            <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-primary h-full transition-all duration-500"
                style={{ width: `${(progresso / meta) * 100}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {progresso} / {meta}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
