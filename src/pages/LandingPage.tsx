import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';
import { ArrowRight, CheckCircle2, Users, Target, BarChart3, Shield, Zap, TrendingUp, Sparkles, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-indigo-500/20 blur-[120px] rounded-full opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-10 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400 mb-8 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]"></span>
                </span>
                The Standard for AI Ventures
              </span>
              <h1 className="text-7xl md:text-[140px] font-bold tracking-tighter text-white leading-[0.8] mb-4">
                Launch <span className="italic serif font-light text-slate-500">faster</span>.<br />
                Grow <span className="underline decoration-indigo-600 underline-offset-[12px] decoration-4">smarter</span>.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
            >
              The first neural-native engine designed specifically for entrepreneurs. We don't just help you start; we build the infrastructure for your inevitable scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
            >
              <Link to="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="w-full h-16 px-10 text-xl font-bold group">
                  Initiate Project
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-10 text-xl font-bold">
                Watch Engine Demo
              </Button>
            </motion.div>
          </div>

          {/* Platform Visualization */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="mt-24 relative max-w-6xl mx-auto"
          >
            <div className="absolute inset-0 bg-indigo-600/10 rounded-[60px] blur-3xl opacity-30 transform -rotate-2 scale-105" />
            <div className="glass-panel rounded-[48px] p-2 sm:p-5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] relative overflow-hidden">
               <div className="bg-slate-900 aspect-[21/9] rounded-[40px] flex items-center justify-center relative overflow-hidden border border-white/5">
                  <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Globe className="text-white/5 w-64 h-64 lg:w-96 lg:h-96 animate-[spin_60s_linear_infinite]" />
                  </div>
                  <div className="relative z-10 text-center space-y-4">
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400/60 block">Neural OS v4.2</span>
                     <h3 className="text-2xl md:text-4xl font-black text-white italic tracking-widest opacity-20">SYSTEMS READY</h3>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {['FORBES', 'WIRED', 'CRUNCHBASE', 'TECHCRUNCH', 'VERGE'].map(brand => (
             <span key={brand} className="text-xl font-black tracking-tighter text-white">{brand}</span>
           ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-32 md:py-48 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">The Blueprint</span>
              <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">From idle thought to market dominant.</h2>
              <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                Our AI doesn't just give advice. It builds the artifacts. From legal structures to your first hiring plan, everything is synthesized in seconds.
              </p>
              
              <div className="space-y-6 pt-4">
                {[
                  { title: 'Semantic Intake', desc: 'Describe your vision in natural language. Our engine maps your entire SWOT, BMC, and competitive landscape.' },
                  { title: 'Dynamic Roadmap', desc: 'A living strategy that re-calibrates based on real-time market shifts and your execution velocity.' },
                  { title: 'Neural Co-Pilot', desc: 'A resident strategic advisor that has been trained on the last 50 years of successful hypergrowth.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="mt-1 w-6 h-6 rounded-full border border-indigo-500/50 flex flex-shrink-0 items-center justify-center text-[10px] font-bold text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      0{i+1}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full opacity-30" />
              <div className="relative grid grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                   <div className="glass-panel p-6 rounded-[32px] space-y-4 translate-y-4">
                      <Zap className="text-indigo-400" size={24} />
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 w-3/4 animate-pulse" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Growth Velocity</p>
                   </div>
                   <div className="glass-panel p-6 rounded-[32px] space-y-2">
                       <TrendingUp className="text-emerald-400" size={20} />
                       <h4 className="text-xl font-bold text-white">+142%</h4>
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quarterly Growth</p>
                   </div>
                </div>
                <div className="space-y-6">
                   <div className="glass-panel p-6 rounded-[32px] aspect-square flex flex-col justify-between">
                      <Users className="text-indigo-400" size={24} />
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-white">Team Radar</h4>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest leading-none">Scanning candidates...</p>
                      </div>
                   </div>
                   <div className="glass-panel p-6 rounded-[32px] space-y-4">
                      <Shield className="text-indigo-400" size={24} />
                      <p className="text-xs text-slate-400 font-medium leading-relaxed italic">"Verified compliance across 12 EU jurisdictions."</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing/CTA */}
      <section id="pricing" className="py-48 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-12">Built to scale.</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { name: 'Seed', price: '49', features: ['AI Roadmap Engine', 'Semantic Intake', '1 Project Space', 'Basic Analytics'] },
                  { name: 'Series A', price: '149', features: ['Neural Co-Pilot 24/7', 'Market Pulse Integration', '5 Project Spaces', 'Team Collaboration'], popular: true },
                  { name: 'Unicorn', price: '499', features: ['Custom Neural Training', 'Priority Access to R&D', 'Unlimited Scale', 'Personal Strategist'] },
                ].map(tier => (
                  <div key={tier.name} className={cn(
                    "glass-panel p-10 rounded-[48px] flex flex-col items-center space-y-8 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500",
                    tier.popular && "border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.15)]"
                  )}>
                    {tier.popular && <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-black px-6 py-2 rounded-bl-3xl tracking-widest">POPULAR</span>}
                    <div className="text-center">
                       <h3 className="text-slate-400 font-black uppercase tracking-[0.3em] text-xs mb-2">{tier.name}</h3>
                       <div className="flex items-baseline justify-center gap-1 text-white">
                          <span className="text-2xl font-bold">$</span>
                          <span className="text-6xl font-black tracking-tighter">{tier.price}</span>
                          <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">/mo</span>
                       </div>
                    </div>
                    <ul className="space-y-4 w-full pt-4 border-t border-white/5">
                      {tier.features.map(f => (
                        <li key={f} className="flex items-center gap-3 text-sm font-medium text-slate-300">
                           <CheckCircle2 size={16} className={cn("text-indigo-400", !tier.popular && "text-slate-600")} />
                           {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant={tier.popular ? "primary" : "outline"} className="w-full h-14 rounded-2xl font-bold">Choose {tier.name}</Button>
                  </div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-48 pt-32">
        <div className="max-w-7xl mx-auto px-4">
           <div className="glass-panel p-12 md:p-32 rounded-[60px] text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-indigo-600/5 group-hover:bg-indigo-600/10 transition-colors opacity-50" />
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full" />
              <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full" />
              
              <div className="relative z-10 space-y-12">
                 <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter uppercase leading-[0.8]">Your future is <br /><span className="text-indigo-400">now online.</span></h2>
                 <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mx-auto">Join the 12,000+ founders who have bypassed the friction and launched their vision with BizLaunch AI.</p>
                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link to="/signup" className="w-full sm:w-auto">
                      <Button size="lg" className="h-16 px-12 text-xl font-black w-full sm:w-auto uppercase tracking-wider">Start Building</Button>
                    </Link>
                    <div className="flex items-center gap-4">
                       <div className="flex -space-x-3">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold text-indigo-400">BM</div>
                          ))}
                       </div>
                       <span className="text-sm font-bold text-slate-400 tracking-tight">Active Founders</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
