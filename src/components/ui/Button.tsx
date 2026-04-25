import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  /** Show a spinner and disable interaction. Also sets aria-busy. */
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, disabled, children, ...props }, ref) => {
    const variants: Record<NonNullable<ButtonProps['variant']>, string> = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20',
      secondary:
        'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm',
      outline:
        'border border-white/10 bg-transparent hover:bg-white/5 text-slate-200',
      ghost:
        'hover:bg-white/5 text-slate-400 hover:text-white',
      danger:
        'bg-red-500/20 text-red-400 border border-red-500/20 hover:bg-red-500/30',
    };

    const sizes: Record<NonNullable<ButtonProps['size']>, string> = {
      sm: 'h-8 px-3 text-xs rounded-md',
      md: 'h-10 px-4 text-sm rounded-lg font-medium',
      lg: 'h-12 px-6 text-base rounded-xl font-medium',
      icon: 'h-10 w-10 rounded-lg',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center shrink-0 cursor-pointer',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'active:scale-[0.98] transition-all duration-200',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="sr-only">Loading…</span>
          </>
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };