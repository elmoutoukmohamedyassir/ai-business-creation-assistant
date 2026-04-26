import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Badge } from '../components/ui/Badge';
import {
  Plus,
  History,
  TrendingUp,
  Users,
  Coins,
  AlertTriangle,
  ArrowUpRight,
  Calendar,
  CloudLightning,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '../utils/cn';
import type { BusinessUpdateEntry } from '../types';

const updateSchema = z.object({
  revenue: z.string().optional(),
  expenses: z.string().optional(),
  clients: z.string().optional(),
  issue: z.string().optional(),
  notes: z.string().min(10, 'Please provide more details (min 10 characters)'),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

const INITIAL_HISTORY: BusinessUpdateEntry[] = [
  {
    id: '1',
    revenue: '12400',
    expenses: '8900',
    clients: '42',
    notes: 'Successful week with high engagement in the Mitte district. Operational costs stabilized.',
    timestamp: '2026-04-18T10:00:00Z',
  },
  {
    id: '2',
    revenue: '9800',
    expenses: '9200',
    clients: '38',
    issue: 'Supply chain delays for new e-scooters',
    notes: 'Slight dip due to hardware constraints. Redirected fleet to higher density zones.',
    timestamp: '2026-04-11T14:30:00Z',
  },
];

export default function UpdatesPage() {
  const [history, setHistory] = useState<BusinessUpdateEntry[]>(INITIAL_HISTORY);
  const [showForm, setShowForm] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = async (data: UpdateFormValues) => {
    // Simulate API save — replace with: await api.saveUpdate(data)
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newEntry: BusinessUpdateEntry = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setHistory((prev) => [newEntry, ...prev]);
    setShowForm(false);
    reset();
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
            Mission Logs.
          </h1>
          <p className="text-slate-400 font-medium">
            Record operational metrics to synchronize the Neural Engine.
          </p>
        </div>
        <Button
          onClick={() => setShowForm((s) => !s)}
          className="h-12 px-6 gap-2 shrink-0"
          variant={showForm ? 'outline' : 'primary'}
          aria-expanded={showForm}
          aria-controls="sync-form"
        >
          {showForm ? (
            'Cancel'
          ) : (
            <>
              <Plus size={18} aria-hidden="true" />
              New Sync Entry
            </>
          )}
        </Button>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left: form + timeline */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence>
            {showForm && (
              <motion.div
                id="sync-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <Card className="border-indigo-500/30 bg-indigo-600/5 p-8">
                  <header className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-1">New Operational Sync</h3>
                    <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">
                      Feed the model with real-world data
                    </p>
                  </header>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    aria-label="New sync entry form"
                    noValidate
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative">
                        <Input
                          label="Revenue (USD)"
                          placeholder="e.g. 12000"
                          type="number"
                          min="0"
                          {...register('revenue')}
                        />
                        <Coins
                          size={14}
                          className="absolute right-3 top-[38px] text-slate-500 pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          label="Expenses (USD)"
                          placeholder="e.g. 9000"
                          type="number"
                          min="0"
                          {...register('expenses')}
                        />
                        <TrendingUp
                          size={14}
                          className="absolute right-3 top-[38px] text-slate-500 pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          label="Active Clients"
                          placeholder="e.g. 45"
                          type="number"
                          min="0"
                          {...register('clients')}
                        />
                        <Users
                          size={14}
                          className="absolute right-3 top-[38px] text-slate-500 pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          label="Critical Issue (Optional)"
                          placeholder="What blocked you?"
                          {...register('issue')}
                        />
                        <AlertTriangle
                          size={14}
                          className="absolute right-3 top-[38px] text-slate-500 pointer-events-none"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="notes"
                        className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
                      >
                        Notes &amp; Observations
                        <span className="text-red-400 ml-1" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="notes"
                        {...register('notes')}
                        aria-invalid={!!errors.notes}
                        aria-describedby={errors.notes ? 'notes-error' : undefined}
                        className={cn(
                          'w-full min-h-[120px] bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white',
                          'focus:outline-none focus:border-indigo-500 transition-colors resize-y',
                          errors.notes && 'border-red-500/50 focus:border-red-500'
                        )}
                        placeholder="Describe the week's strategic outcomes…"
                      />
                      {errors.notes && (
                        <p id="notes-error" role="alert" className="text-xs text-red-400 font-medium">
                          {errors.notes.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      loading={isSubmitting}
                      className="w-full h-14 font-black uppercase tracking-widest text-base"
                    >
                      {!isSubmitting && 'Synchronize State'}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Timeline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <History size={18} className="text-slate-500" aria-hidden="true" />
              <h2 className="text-xl font-bold text-white uppercase tracking-tighter">
                Timeline History
              </h2>
            </div>

            {history.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <History size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm font-medium">No syncs recorded yet. Add your first entry above.</p>
              </div>
            )}

            {history.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <Card className="hover:border-white/20 transition-all p-0 overflow-hidden">
                  <div className="bg-white/[0.02] p-5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Calendar size={14} className="text-indigo-400" aria-hidden="true" />
                      <time
                        dateTime={entry.timestamp}
                        className="text-xs font-bold text-white"
                      >
                        {new Date(entry.timestamp).toLocaleDateString(undefined, {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                    <Badge variant="outline" className="text-[9px]">
                      SYNC VERIFIED
                    </Badge>
                  </div>

                  <div className="p-7">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-7">
                      {entry.revenue && (
                        <Metric
                          label="Gross Revenue"
                          value={`$${Number(entry.revenue).toLocaleString()}`}
                          valueClass="text-white"
                        />
                      )}
                      {entry.expenses && (
                        <Metric
                          label="Operational Spend"
                          value={`$${Number(entry.expenses).toLocaleString()}`}
                          valueClass="text-rose-400"
                        />
                      )}
                      {entry.clients && (
                        <Metric
                          label="Active Clients"
                          value={`${entry.clients} clients`}
                          valueClass="text-indigo-400"
                        />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Mission Intelligence
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {entry.notes}
                      </p>
                    </div>

                    {entry.issue && (
                      <div className="mt-5 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 flex gap-3">
                        <AlertTriangle
                          size={15}
                          className="text-rose-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div className="space-y-0.5">
                          <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">
                            Reported Blocker
                          </p>
                          <p className="text-xs text-rose-300 font-medium italic">{entry.issue}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: insights */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="bg-indigo-600/5 border-white/5 relative overflow-hidden group">
            <div
              className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"
              aria-hidden="true"
            >
              <CloudLightning size={100} />
            </div>
            <CardHeader>
              <CardDescription>Network Influence</CardDescription>
              <CardTitle className="text-2xl">State Vector</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-sm text-slate-400 font-medium italic">
                Your weekly syncs increase the precision of the Neural Engine by{' '}
                <strong className="text-white not-italic">12.4%</strong> each time.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                  <span>Data Integrity</span>
                  <span className="text-emerald-400">92%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[92%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="p-5 bg-white/[0.01] rounded-[32px] border border-dashed border-white/5">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-5 px-1">
              Metrics Correlation
            </h4>
            <div className="space-y-5">
              {[
                { label: 'Rev vs Exp', trend: 'Positive Margin', color: 'text-emerald-400' },
                { label: 'Client Growth', trend: 'Stable v1.2', color: 'text-indigo-400' },
                { label: 'Burn Rate', trend: 'Under Pilot Cap', color: 'text-white' },
              ].map((metric) => (
                <div key={metric.label} className="group">
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">
                      {metric.label}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-600 group-hover:text-white transition-colors"
                      aria-hidden="true"
                    />
                  </div>
                  <p className={cn('text-[10px] font-black uppercase tracking-widest', metric.color)}>
                    {metric.trend}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function Metric({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
        {label}
      </p>
      <p className={cn('text-xl font-black italic tracking-tighter', valueClass)}>{value}</p>
    </div>
  );
}