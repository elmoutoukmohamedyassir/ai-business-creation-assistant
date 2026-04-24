import { Link } from 'react-router-dom';
import { Rocket, Twitter, Linkedin, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-white/[0.02] backdrop-blur-3xl py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
        <div className="col-span-2 lg:col-span-2 space-y-6">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl tracking-tight text-white">
            <div className="bg-indigo-600 text-white p-1.5 rounded-xl shadow-lg shadow-indigo-500/20">
              <Rocket size={20} />
            </div>
            BizLaunch AI
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium">
            The world's most intelligent platform for entrepreneurs to ideate, launch, and grow with AI-driven precision.
          </p>
          <div className="flex gap-4">
            {[Twitter, Linkedin, Github].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            <li><Link to="/#features" className="hover:text-indigo-400 transition-colors">Features</Link></li>
            <li><Link to="/#pricing" className="hover:text-indigo-400 transition-colors">Pricing</Link></li>
            <li><Link to="/#roadmap" className="hover:text-indigo-400 transition-colors">Roadmap Engine</Link></li>
            <li><Link to="/#updates" className="hover:text-indigo-400 transition-colors">Intelligence</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Carrers</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Press Kit</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Legal</h4>
          <ul className="space-y-4 text-sm font-medium text-slate-400">
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Cookie Policy</a></li>
            <li><a href="#" className="hover:text-indigo-400 transition-colors">Security</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-xs font-medium">
          &copy; 2026 BizLaunch AI. Built for the next generation of founders.
        </p>
        <div className="flex gap-8">
           <span className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-widest flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
             All Systems Operational
           </span>
        </div>
      </div>
    </footer>
  );
}
