import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Rocket, Terminal, Compass } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 mesh-bg text-slate-200 text-center selection:bg-indigo-500 selection:text-white">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-12 max-w-lg"
      >
        <div className="relative">
          <h1 className="text-[180px] md:text-[240px] font-black tracking-tighter text-white leading-none opacity-5 italic select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center flex-col space-y-4">
              <div className="bg-indigo-600 p-4 rounded-[32px] text-white shadow-2xl shadow-indigo-500/40 transform rotate-12 mb-4">
                <Rocket size={48} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-[0.8] mb-2">
                LOST IN THE <br /><span className="text-indigo-400 underline decoration-indigo-600 underline-offset-8">SAUCE.</span>
              </h2>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm mx-auto">
             The neural coordinates you provided don't exist in our current strategic map. You've reached a dead end.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                <Terminal size={12} />
                ERR_CODE: NULL_DOMAIN
             </div>
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                <Compass size={12} />
                COORD: 0x0_NAV
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-8">
           <Link to="/dashboard" className="flex-1">
             <Button className="w-full h-14 text-lg font-black uppercase tracking-widest">Return to Base</Button>
           </Link>
           <Link to="/" className="flex-1">
             <Button variant="outline" className="w-full h-14 text-lg font-black uppercase tracking-widest">Public Terminals</Button>
           </Link>
        </div>
      </motion.div>
      
      <div className="fixed bottom-12 text-[10px] font-black text-slate-700 uppercase tracking-[0.5em] select-none">
        BizLaunch Intelligence OS // v4.2.0-Alpha
      </div>
    </div>
  );
}
