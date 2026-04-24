import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'flex h-11 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white',
            'placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500',
            'disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
            error && 'border-red-500/50 focus:ring-red-500/10 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500 ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export { Input };
