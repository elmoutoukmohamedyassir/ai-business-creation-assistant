import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { 
  Zap, 
  Target, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Globe,
  Cpu,
  BarChart4
} from 'lucide-react';
import { mockRecommendations } from '../data/mock';
import { cn } from '../utils/cn';

export default function RecommendationsPage() {
  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">Active Advise.</h1>
          <p className="text-slate-400 font-medium">Neural Insights generated from your latest operational syncs.</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 h-12 flex items-center bg-white/5 border border-white/5 rounded-2xl text-[10px] font-bold text-indigo-400 uppercase tracking-widest">
              Last Sync: 2h ago
           </div>
        </div>
      </header>

      {/* Hero Recommendation */}
      <Card className="bg-indigo-600 border-indigo-500 overflow-hidden group shadow-2xl shadow-indigo-500/20">
         <div className="grid lg:grid-cols-2">
            <div className="p-12 space-y-8 relative z-10">
               <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-widest text-white border border-white/10 backdrop-blur-md">
                 <Sparkles size={12} />
                 Priority Alpha Impact
               </span>
               <h2 className="text-5xl font-black text-white italic tracking-tighter leading-[0.9]">Autonomous Fleet Expansion.</h2>
               <p className="text-lg text-indigo-100 font-medium leading-relaxed max-w-md">
                 Our simulation shows that deploying 5 additional e-cargo bikes in Berlin-Mitte will trigger a network effect, reducing your unit delivery cost by <span className="text-white font-black underline underline-offset-4 decoration-2">18.5%</span>.
               </p>
               <Button variant="secondary" className="h-14 px-10 text-lg font-black uppercase tracking-widest bg-white text-indigo-600 hover:bg-neutral-100 group">
                  Initiate Expansion
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
               </Button>
            </div>
            <div className="relative h-64 lg:h-auto bg-indigo-700/50 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
               <Cpu size={200} className="text-white/5 absolute -right-12 -bottom-12 transform rotate-12" />
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                 className="relative w-64 h-64 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center"
               >
                  <div className="w-48 h-48 border border-white/20 rounded-full flex items-center justify-center">
                     <TrendingUp size={48} className="text-white opacity-40" />
                  </div>
               </motion.div>
            </div>
         </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-bold text-white px-2">Intelligence Stream</h3>
            <div className="grid md:grid-cols-2 gap-6">
               {mockRecommendations.map((rec, i) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="hover:border-indigo-500/30 transition-all cursor-pointer group h-full flex flex-col">
                       <CardHeader className="pb-4">
                          <div className="flex items-center justify-between mb-4">
                             <Badge variant="secondary" className="px-1.5 py-0.5 text-[9px] uppercase tracking-[0.1em]">{rec.category}</Badge>
                             <div className="flex gap-1">
                                {[1,2,3].map(dot => (
                                  <div key={dot} className={cn("w-1 h-1 rounded-full", dot <= (rec.difficulty === 'easy' ? 1 : rec.difficulty === 'medium' ? 2 : 3) ? "bg-amber-400" : "bg-white/5")} />
                                ))}
                             </div>
                          </div>
                          <CardTitle className="text-xl group-hover:text-indigo-400 transition-colors uppercase italic">{rec.title}</CardTitle>
                       </CardHeader>
                       <CardContent className="flex-1">
                          <p className="text-sm text-slate-400 leading-relaxed font-medium line-clamp-3">{rec.description}</p>
                       </CardContent>
                       <CardFooter className="pt-6 border-t border-white/5 bg-white/[0.01]">
                          <div className="w-full flex items-center justify-between">
                             <div className="space-y-0.5">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Neural Impact</p>
                                <p className="text-xs font-black text-emerald-400 italic">{rec.impact}</p>
                             </div>
                             <Button size="icon" variant="ghost" className="rounded-full h-8 w-8 text-slate-600 hover:text-white">
                                <ArrowRight size={14} />
                             </Button>
                          </div>
                       </CardFooter>
                    </Card>
                  </motion.div>
               ))}
            </div>
         </div>

         <div className="space-y-8">
            <h3 className="text-2xl font-bold text-white px-1">Risk Mitigation</h3>
            <div className="space-y-4">
               {[
                  { tag: 'OPERATIONAL', title: 'Route Saturation', risk: 'Medium', desc: 'Berlin pilot routes are hitting 85% capacity. Delaying expansion may lead to missed delivery windows.' },
                  { tag: 'REGULATORY', title: 'New EV Mandates', risk: 'High', desc: 'Upcoming Brandenburg legislation requires full transition by Q3. Accelerate fleet conversion.' },
               ].map((item, i) => (
                  <Card key={i} className="bg-rose-500/5 border-rose-500/20 p-6 space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-rose-400 uppercase tracking-[0.2em]">{item.tag}</span>
                        <ShieldAlert size={16} className="text-rose-500" />
                     </div>
                     <h4 className="text-lg font-bold text-white leading-tight">{item.title}</h4>
                     <p className="text-xs text-rose-300 font-medium leading-relaxed italic line-clamp-2">{item.desc}</p>
                     <div className="pt-2 flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Risk Level</span>
                        <Badge variant="outline" className="text-rose-400 border-rose-500/30 font-black">{item.risk}</Badge>
                     </div>
                  </Card>
               ))}
            </div>

            <div className="glass-panel p-8 rounded-[40px] relative overflow-hidden group">
               <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-colors" />
               <div className="relative z-10 space-y-6">
                  <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400">
                     <Globe size={24} />
                  </div>
                  <h4 className="text-xl font-bold text-white leading-tight">Industry Benchmark</h4>
                  <p className="text-xs text-slate-400 font-medium leading-relaxed">Your venture is performing in the top <span className="text-white">7%</span> of logistics startups in Germany. The engine recommends a Seed round valuation push.</p>
                  <Button variant="outline" className="w-full text-xs font-bold py-5 h-10 italic">Analyze Benchmarks</Button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
