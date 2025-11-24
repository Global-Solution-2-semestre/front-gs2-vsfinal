import Card from './Card';

export interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  trend?: string;
  variant?: 'default' | 'gradient' | 'glow';
}

export default function StatCard({ icon, label, value, trend, variant = 'default' }: StatCardProps) {
  return (
    <Card variant={variant} className="hover:scale-105 transition-transform duration-300">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-50">{value}</p>
          {trend && (
            <p className="text-green-600 dark:text-green-400 text-sm font-medium">
              {trend}
            </p>
          )}
        </div>
        <div className="text-4xl animate-float">{icon}</div>
      </div>
    </Card>
  );
}
