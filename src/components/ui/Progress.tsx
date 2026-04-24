import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  indicatorClassName?: string;
}

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, indicatorClassName, ...props }, ref) => {
    const percentage = Math.min(Math.max(0, (value / max) * 100), 100);

    return (
      <div
        ref={ref}
        className={cn('relative h-2 w-full overflow-hidden rounded-full bg-white/5', className)}
        {...props}
      >
        <div
          className={cn(
            'h-full w-full flex-1 bg-indigo-500 transition-all duration-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]',
            indicatorClassName
          )}
          style={{ transform: `translateX(-${100 - percentage}%)` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';
export { Progress };
