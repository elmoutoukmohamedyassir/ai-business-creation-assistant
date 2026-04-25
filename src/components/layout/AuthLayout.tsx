import { Outlet, Link, Navigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

const FEATURE_TAGS = ['Smart Intake', 'Dynamic Roadmaps', 'AI Copilot'];

export function AuthLayout() {
  const { isAuthenticated } = useAuth();

  // If already logged in, bounce to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="grid lg:grid-cols-2 min-h-screen mesh-bg text-slate-200">
      {/* Left: form panel */}
      <div className="flex flex-col p-8 lg:p-12 relative z-10">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight mb-12 text-white w-fit"
          aria-label="BizLaunch AI — Back to home"
        >
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
            <Rocket size={20} aria-hidden="true" />
          </div>
          BizLaunch <span className="text-slate-500 font-medium">AI</span>
        </Link>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <Outlet />
        </div>

        <p className="mt-auto text-xs text-neutral-400">
          &copy; {new Date().getFullYear()} BizLaunch AI. All rights reserved.
        </p>
      </div>

      {/* Right: marketing panel */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-indigo-950/20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(99,102,241,0.12)_0%,transparent_70%)]" />
        <div className="relative z-10 p-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-md"
          >
            <h2 className="text-4xl font-bold text-white tracking-tight">
              Scale your vision with AI precision.
            </h2>
            <p className="text-slate-400 text-lg">
              The world's most intelligent platform for entrepreneurs to ideate, launch, and grow.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {FEATURE_TAGS.map((tag, i) => (
                <span
                  key={tag}
                  className={
                    i === 0
                      ? 'px-3 py-1 rounded-full bg-white/5 border border-indigo-500/50 text-xs text-white font-medium tracking-wide'
                      : 'px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-500 font-medium tracking-wide'
                  }
                >
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