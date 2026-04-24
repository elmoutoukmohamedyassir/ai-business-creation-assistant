import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate } from 'react-router-dom';
import { Rocket, Sparkles, Target, Zap, CheckCircle2 } from 'lucide-react';

export default function IntakePage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const next = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-[40px] border border-neutral-200 shadow-2xl overflow-hidden p-10 md:p-16">
        <div className="flex items-center gap-4 mb-12">
            <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`w-10 h-1 h-2 rounded-full ${i <= step ? 'bg-black' : 'bg-neutral-100'} transition-colors duration-500`} />
                ))}
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">Step {step} of 3</span>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-black/5 w-12 h-12 flex items-center justify-center rounded-2xl">
                <Sparkles size={24} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">First, the spark.</h2>
              <p className="text-neutral-500 font-medium">What's the core idea or name of your new venture?</p>
              <Input placeholder="e.g. EcoStream Logistics" className="h-14 md:text-lg" />
              <Button onClick={next} className="h-14 px-8 w-full">Continue to Goals</Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-black/5 w-12 h-12 flex items-center justify-center rounded-2xl">
                <Target size={24} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Mission parameters.</h2>
              <p className="text-neutral-500 font-medium">What industry best describes your focus?</p>
              <div className="grid grid-cols-2 gap-3">
                {['Technology', 'Creative', 'Service', 'Retail', 'Education', 'Health'].map(ind => (
                    <button key={ind} className="px-4 py-4 rounded-2xl border border-neutral-100 text-sm font-semibold hover:border-black transition-all">
                        {ind}
                    </button>
                ))}
              </div>
              <Button onClick={next} className="h-14 px-8 w-full mt-4">Set Objectives</Button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="bg-black/5 w-12 h-12 flex items-center justify-center rounded-2xl">
                <Zap size={24} />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Final ignition.</h2>
              <p className="text-neutral-500 font-medium">Sit back while we generate your customized business engine.</p>
              <div className="p-8 border border-neutral-100 rounded-3xl bg-neutral-50/50 space-y-4">
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-xs font-bold text-neutral-600">Analyzing market trends...</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-green-500" />
                    <span className="text-xs font-bold text-neutral-600">Drafting operational roadmap...</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    <span className="text-xs font-bold text-black underline">Finalizing AI Assistant directives...</span>
                 </div>
              </div>
              <Button onClick={next} className="h-14 px-8 w-full flex items-center gap-2">
                Launch Workspace
                <Rocket size={18} />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
