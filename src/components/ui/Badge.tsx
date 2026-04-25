import { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant =
  | 'default'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'info'
  | 'outline'
  | 'danger';

export interface BadgeProps {
  variant?: BadgeVariant;
  children?: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  default: 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20',
  secondary: 'bg-white/10 text-slate-200 border border-white/10',
  success: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  info: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
  outline: 'border border-white/10 text-slate-400',
  danger: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
};

export function Badge({ className, variant = 'default', children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
        VARIANT_CLASSES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}