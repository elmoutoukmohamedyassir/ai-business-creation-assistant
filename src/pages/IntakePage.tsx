import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useNavigate, Link } from 'react-router-dom';
import { Rocket, Sparkles, Target, Zap, CheckCircle2, ArrowLeft } from 'lucide-react';
import { cn } from '../utils/cn';
import { useAuth } from '../context/AuthContext';

const INDUSTRIES = [
  'Technology',
  'Creative',
  'Service',
  'Retail',
  'Education',
  'Health',
  'Logistics',
  'Finance',
] as const;

type Industry = (typeof INDUSTRIES)[number];

interface IntakeState {
  businessName: string;
  industry: Industry | '';
  goals: string;
}

const STEPS = [
  { icon: Sparkles, label: 'The Spark' },
  { icon: Target, label: 'Mission' },
  { icon: Zap, label: 'Launch' },
] as const;

export default function IntakePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<IntakeState>({
    businessName: '',
    industry: '',
    goals: '',
  });
  const [errors, setErrors] = useState<{ businessName?: string; industry?: string; goals?: string }>({});
  const navigate = useNavigate();
  const { user } = useAuth();

  const validate = (): boolean => {
    const newErrors: { businessName?: string; industry?: string; goals?: string } = {};
    if (step === 1 && !form.businessName.trim()) {
      newErrors.businessName = 'Please enter your venture name';
    }
    if (step === 2 && !form.industry) {
      newErrors.industry = 'Please select an industry';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (step < 3) {
      setStep((s) => s + 1);
    } else {
      // In production: POST /api/intake with form data
      // For now: persist to localStorage as a stub
      localStorage.setItem('bizlaunch_intake', JSON.stringify(form));
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const progressPct = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="min-h-screen mesh-bg text-slate-200 flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 pt-6">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight text-white"
          aria-label="BizLaunch AI — Home"
        >
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
            <Rocket size={18} aria-hidden="true" />
          </div>
          BizLaunch AI
        </Link>
        {user && (
          <span className="text-xs text-slate-500 font-medium hidden sm:block">
            Hey, {user.name.split(' ')[0]} 👋
          </span>
        )}
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="max-w-xl w-full">
          {/* Step indicator */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 shrink-0">
              {step} / {STEPS.length}
            </span>
          </div>

          {/* Step card */}
          <div className="glass-panel rounded-[40px] overflow-hidden">
            <AnimatePresence mode="wait">
              {/* ── STEP 1 ── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="p-10 md:p-16 space-y-8"
                >
                  <div className="bg-indigo-600/20 border border-indigo-500/20 w-14 h-14 flex items-center justify-center rounded-2xl text-indigo-400">
                    <Sparkles size={26} aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                      First, the spark.
                    </h2>
                    <p className="text-slate-400 font-medium">
                      What's the core idea or name of your new venture?
                    </p>
                  </div>
                  <Input
                    label="Venture Name"
                    placeholder="e.g. EcoStream Logistics"
                    value={form.businessName}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, businessName: e.target.value }));
                      if (errors.businessName) setErrors((er) => ({ ...er, businessName: '' }));
                    }}
                    error={errors.businessName}
                    className="h-14 text-base"
                    autoFocus
                    autoComplete="organization"
                  />
                  <StepActions step={step} onNext={handleNext} onBack={handleBack} />
                </motion.div>
              )}

              {/* ── STEP 2 ── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="p-10 md:p-16 space-y-8"
                >
                  <div className="bg-indigo-600/20 border border-indigo-500/20 w-14 h-14 flex items-center justify-center rounded-2xl text-indigo-400">
                    <Target size={26} aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                      Mission parameters.
                    </h2>
                    <p className="text-slate-400 font-medium">
                      What industry best describes your focus?
                    </p>
                  </div>

                  <fieldset>
                    <legend className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      Select Industry
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => {
                            setForm((f) => ({ ...f, industry: ind }));
                            setErrors((er) => ({ ...er, industry: '' }));
                          }}
                          className={cn(
                            'px-4 py-4 rounded-2xl border text-sm font-semibold transition-all text-left',
                            form.industry === ind
                              ? 'border-indigo-500 bg-indigo-600/20 text-white shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                              : 'border-white/10 bg-white/5 text-slate-400 hover:border-white/30 hover:text-white'
                          )}
                          aria-pressed={form.industry === ind}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                    {errors.industry && (
                      <p role="alert" className="mt-2 text-xs text-red-400 font-medium">
                        {errors.industry}
                      </p>
                    )}
                  </fieldset>

                  <StepActions step={step} onNext={handleNext} onBack={handleBack} />
                </motion.div>
              )}

              {/* ── STEP 3 ── */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.25 }}
                  className="p-10 md:p-16 space-y-8"
                >
                  <div className="bg-emerald-500/20 border border-emerald-500/20 w-14 h-14 flex items-center justify-center rounded-2xl text-emerald-400">
                    <Zap size={26} aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
                      Final ignition.
                    </h2>
                    <p className="text-slate-400 font-medium">
                      Your workspace is being prepared based on your inputs.
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-3">
                    <SummaryRow label="Venture" value={form.businessName} />
                    <SummaryRow label="Industry" value={form.industry || '—'} />
                  </div>

                  <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02] space-y-3">
                    {[
                      { label: 'Analyzing market trends', done: true },
                      { label: 'Drafting operational roadmap', done: true },
                      { label: 'Finalizing AI Assistant directives', done: false },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-3">
                        {item.done ? (
                          <CheckCircle2 size={16} className="text-emerald-400 shrink-0" aria-hidden="true" />
                        ) : (
                          <div className="w-4 h-4 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                          </div>
                        )}
                        <span
                          className={cn(
                            'text-xs font-bold',
                            item.done ? 'text-slate-400' : 'text-white'
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  <StepActions
                    step={step}
                    onNext={handleNext}
                    onBack={handleBack}
                    finalLabel="Launch Workspace"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StepActionsProps {
  step: number;
  onNext: () => void;
  onBack: () => void;
  finalLabel?: string;
}

function StepActions({ step, onNext, onBack, finalLabel = 'Continue' }: StepActionsProps) {
  return (
    <div className="flex gap-3 pt-2">
      {step > 1 && (
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          aria-label="Go back to previous step"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      )}
      <Button
        type="button"
        onClick={onNext}
        className="flex-1 h-14 font-black uppercase tracking-widest text-base flex items-center gap-2"
      >
        {finalLabel}
        {step === 3 && <Rocket size={18} aria-hidden="true" />}
      </Button>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-500 font-medium text-xs uppercase tracking-wider">{label}</span>
      <span className="text-white font-bold">{value}</span>
    </div>
  );
}