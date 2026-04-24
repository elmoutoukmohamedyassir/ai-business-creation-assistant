import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-3xl glass-panel p-6',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 pb-4', className)} {...props} />
);

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn('text-lg font-bold leading-tight tracking-tight text-white', className)} {...props} />
);

const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn('text-xs font-semibold uppercase tracking-wider text-slate-400', className)} {...props} />
);

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('pt-0 text-slate-300', className)} {...props} />
);

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex items-center pt-4 border-t border-white/5 mt-4', className)} {...props} />
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
