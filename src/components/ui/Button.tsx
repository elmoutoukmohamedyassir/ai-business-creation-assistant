import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20',
      secondary: 'bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-sm',
      outline: 'border border-white/10 bg-transparent hover:bg-white/5 text-slate-200 transition-colors',
      ghost: 'hover:bg-white/5 text-slate-400 hover:text-white transition-colors',
      danger: 'bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30 transition-colors',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-10 px-4 py-2 text-sm rounded-lg font-medium',
      lg: 'h-12 px-6 py-3 text-base rounded-xl font-medium',
      icon: 'h-10 w-10 flex items-center justify-center rounded-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
export { Button };
