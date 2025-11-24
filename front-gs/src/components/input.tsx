import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 rounded-xl border-2 transition-all duration-300
          bg-card text-foreground
          border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20
          placeholder:text-muted-foreground
          ${error && 'border-destructive focus:border-destructive focus:ring-destructive/20'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
