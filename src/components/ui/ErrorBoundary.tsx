import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from './Button';

interface EBProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface EBState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<EBProps, EBState> {
  constructor(props: EBProps) {
    super(props);
    this.state = { hasError: false, error: null };
    this.handleReset = this.handleReset.bind(this);
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset() {
    this.setState({ hasError: false, error: null });
  }

  render(): ReactNode {
    const { hasError, error } = this.state;
    const { fallback, children } = this.props;

    if (!hasError) return children;
    if (fallback) return fallback;

    return (
      <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-panel rounded-[40px] p-10 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto">
            <AlertTriangle size={28} className="text-red-400" aria-hidden="true" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              System Error
            </h2>
            <p className="text-slate-400 text-sm font-medium">
              An unexpected error occurred.
            </p>
            {error && (
              <details className="text-left mt-4">
                <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-300 transition-colors font-bold uppercase tracking-widest">
                  Error details
                </summary>
                <pre className="mt-2 p-3 bg-white/5 rounded-xl text-xs text-red-300 overflow-auto max-h-40 whitespace-pre-wrap break-words">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={this.handleReset}>
              Try Again
            </Button>
            <Button onClick={() => (window.location.href = '/')}>Go Home</Button>
          </div>
        </div>
      </div>
    );
  }
}