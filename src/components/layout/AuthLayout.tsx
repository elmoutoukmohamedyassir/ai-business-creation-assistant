import { Outlet, Link } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { motion } from 'motion/react';

export function AuthLayout() {
  return (
    <div className="grid lg:grid-cols-2 min-h-screen mesh-bg text-slate-200">
      <div className="flex flex-col p-8 lg:p-12 relative z-10 glass-panel border-none rounded-none backdrop-blur-none">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight mb-12 text-white">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
            <Rocket size={20} />
          </div>
          BizLaunch <span className="text-slate-500 font-medium">AI</span>
        </Link>
        
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <Outlet />
        </div>

        <div className="mt-auto text-xs text-neutral-400">
          &copy; 2026 BizLaunch AI. All rights reserved.
        </div>
      </div>

      <div className="hidden lg:flex relative items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.1)_0%,transparent_70%)] opacity-50" />
        <div className="relative z-10 p-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-md"
          >
            <h2 className="text-4xl font-bold text-white tracking-tight">Scale your vision with AI precision.</h2>
            <p className="text-slate-400 text-lg">
              The world's most intelligent platform for entrepreneurs to ideate, launch, and grow.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Smart Intake', 'Dynamic Roadmaps', 'AI Copilot'].map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-500 font-medium tracking-wide first:text-white first:border-indigo-500/50">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
