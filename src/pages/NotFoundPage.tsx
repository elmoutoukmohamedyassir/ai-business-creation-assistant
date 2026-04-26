import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'motion/react';
import { ArrowLeft, Home, MessageSquare } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mesh-bg flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg w-full"
      >
        {/* Glitch 404 */}
        <div className="relative mb-8 select-none" aria-hidden="true">
          <p className="text-[10rem] font-black text-white/[0.03] leading-none tracking-tighter pointer-events-none">
            404
          </p>
          <p className="absolute inset-0 flex items-center justify-center text-7xl font-black text-white tracking-tighter">
            404
          </p>
        </div>

        <div className="space-y-4 mb-10">
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter">
            Sector not found.
          </h1>
          <p className="text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            This quadrant doesn't exist in the BizLaunch universe. The route you're looking for may
            have been moved, deleted, or never existed.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="gap-2"
            aria-label="Go back to previous page"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Go back
          </Button>
          <Link to="/">
            <Button variant="outline" className="gap-2 w-full sm:w-auto">
              <Home size={16} aria-hidden="true" />
              Home
            </Button>
          </Link>
          <Link to="/assistant">
            <Button className="gap-2 w-full sm:w-auto">
              <MessageSquare size={16} aria-hidden="true" />
              AI Assistant
            </Button>
          </Link>
        </div>

        {/* Background glow */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl" />
        </div>
      </motion.div>
    </div>
  );
}