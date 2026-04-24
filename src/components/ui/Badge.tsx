import { ReactNode, HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'info' | 'outline' | 'danger';
  className?: string;
  children?: ReactNode;
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20',
    secondary: 'bg-white/10 text-slate-200 border border-white/10',
    success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    outline: 'border border-white/10 text-slate-400',
    danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
