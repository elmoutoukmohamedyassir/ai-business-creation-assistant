import { Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { Button } from './Button';

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
            <Rocket size={20} />
          </div>
          BizLaunch <span className="text-slate-500 font-medium">AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link to="/#features" className="hover:text-white transition-colors">Features</Link>
          <Link to="/#how-it-works" className="hover:text-white transition-colors">How it works</Link>
          <Link to="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link to="/signup">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
