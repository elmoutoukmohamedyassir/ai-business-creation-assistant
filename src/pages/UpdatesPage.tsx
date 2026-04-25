import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
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
  CloudLightning
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from '../utils/cn';
import { CardDescription } from '../components/ui/Card';

const updateSchema = z.object({
  revenue: z.string().optional(),
  expenses: z.string().optional(),
  clients: z.string().optional(),
  issue: z.string().optional(),
  notes: z.string().min(10, 'Please provide more details (min 10 chars)'),
});

type UpdateFormValues = z.infer<typeof updateSchema>;

interface BusinessUpdate extends UpdateFormValues {
  id: string;
  timestamp: string;
}

const initialHistory: BusinessUpdate[] = [
  { id: '1', revenue: '12400', expenses: '8900', clients: '42', notes: 'Successful week with high engagement in the Mitte district. Operational costs stabilized.', timestamp: '2026-04-18T10:00:00Z' },
  { id: '2', revenue: '9800', expenses: '9200', clients: '38', issue: 'Supply chain delays for new e-scooters', notes: 'Slight dip due to hardware constraints. Redirected fleet to higher density zones.', timestamp: '2026-04-11T14:30:00Z' },
];

export default function UpdatesPage() {
  const [history, setHistory] = useState<BusinessUpdate[]>(initialHistory);
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
  });

  const onSubmit = (data: UpdateFormValues) => {
    const newUpdate: BusinessUpdate = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setHistory([newUpdate, ...history]);
    setShowForm(false);
    reset();
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">Mission Logs.</h1>
          <p className="text-slate-400 font-medium">Record operational metrics to synchronize the Neural Engine.</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="h-12 px-6 gap-2">
          {showForm ? 'Cancel Entry' : <><Plus size={18} /> New Sync Entry</>}
        </Button>
      </header>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <Card className="border-indigo-500/30 bg-indigo-600/5 p-8">
                  <header className="mb-8">
                     <h3 className="text-xl font-bold text-white mb-1">New Operational Sync</h3>
                     <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest">Feed the model with real-world data</p>
                  </header>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <Input 
                          label="Revenue (USD)" 
                          placeholder="e.g. 12000" 
                          
                          {...register('revenue')} 
                        />
                        <Input 
                          label="Expenses (USD)" 
                          placeholder="e.g. 9000" 
                          
                          {...register('expenses')} 
                        />
                        <Input 
                          label="Active Clients" 
                          placeholder="e.g. 45" 
                          
                          {...register('clients')} 
                        />
                        <Input 
                          label="Critical Issue (Optional)" 
                          placeholder="What blocked you?" 
                          
                          {...register('issue')} 
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 ml-1">Notes & Observations</label>
                        <textarea 
                          {...register('notes')}
                          className="w-full min-h-[120px] bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                          placeholder="Describe the week's strategic outcomes..."
                        />
                        {errors.notes && <p className="text-xs text-red-400 font-bold ml-1">{errors.notes.message}</p>}
                     </div>
                     <Button type="submit" className="w-full h-14 font-black uppercase tracking-widest text-lg">Synchronize State</Button>
                  </form>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-4">
             <div className="flex items-center gap-3 px-2 mb-2">
                <History size={18} className="text-slate-500" />
                <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Timeline History</h2>
             </div>
             
             {history.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:border-white/20 transition-all p-0 overflow-hidden">
                     <div className="bg-white/[0.02] p-6 border-b border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <Calendar size={14} className="text-indigo-400" />
                           <span className="text-xs font-bold text-white">{new Date(entry.timestamp).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <Badge variant="outline" className="text-[9px]">SYNC VERIFIED</Badge>
                     </div>
                     <div className="p-8">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                           {entry.revenue && (
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Gross Revenue</p>
                                 <p className="text-xl font-black text-white italic tracking-tighter">${Number(entry.revenue).toLocaleString()}</p>
                              </div>
                           )}
                           {entry.expenses && (
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Operational Spend</p>
                                 <p className="text-xl font-black text-rose-400 italic tracking-tighter">${Number(entry.expenses).toLocaleString()}</p>
                              </div>
                           )}
                           {entry.clients && (
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Market Penetration</p>
                                 <p className="text-xl font-black text-indigo-400 italic tracking-tighter">{entry.clients} Clients</p>
                              </div>
                           )}
                        </div>
                        
                        <div className="space-y-2">
                           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Mission Intelligence</p>
                           <p className="text-sm text-slate-300 leading-relaxed font-medium">{entry.notes}</p>
                        </div>

                        {entry.issue && (
                           <div className="mt-6 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 flex gap-3">
                              <AlertTriangle size={16} className="text-rose-400 shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                 <p className="text-[10px] font-bold text-rose-400 uppercase tracking-widest leading-none">Reported Blocker</p>
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

        <div className="lg:col-span-4 space-y-6">
           <Card className="bg-indigo-600/5 border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                 <CloudLightning size={100} />
              </div>
              <CardHeader>
                 <CardDescription>Network Influence</CardDescription>
                 <CardTitle className="text-2xl">State Vector</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 <p className="text-sm text-slate-400 font-medium italic">Your weekly syncs increase the precision of the Neural Engine by <span className="text-white">12.4%</span> each time.</p>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                       <span>Data Integrity</span>
                       <span className="text-emerald-400">92%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full">
                       <div className="h-full bg-emerald-500 w-[92%] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    </div>
                 </div>
              </CardContent>
           </Card>

           <div className="p-6 bg-white/[0.01] rounded-[40px] border border-dashed border-white/5">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6 px-2">Metrics Correlation</h4>
              <div className="space-y-6">
                 {[
                    { label: 'Rev vs Exp', trend: 'Positive Margin', color: 'text-emerald-400' },
                    { label: 'Client Growth', trend: 'Stable v1.2', color: 'text-indigo-400' },
                    { label: 'Burn Rate', trend: 'Under Pilot Cap', color: 'text-white' },
                 ].map(metric => (
                    <div key={metric.label} className="group">
                        <div className="flex justify-between items-center mb-1">
                           <span className="text-xs font-bold text-slate-300 group-hover:text-white transition-colors">{metric.label}</span>
                           <ArrowUpRight size={14} className="text-slate-600 group-hover:text-white transition-colors" />
                        </div>
                        <p className={cn("text-[10px] font-black uppercase tracking-widest ml-0.5", metric.color)}>{metric.trend}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
