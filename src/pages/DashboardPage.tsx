import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { mockBusiness, mockRoadmap, mockRecommendations } from '../data/mock';
import { ArrowUpRight, Clock, Package, Briefcase, TrendingUp, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '../components/ui/Button';

export default function DashboardPage() {
  const completedTasks = mockRoadmap.filter(t => t.status === 'completed').length;
  const progress = Math.round((completedTasks / mockRoadmap.length) * 100);

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-white">Market Overview</h1>
          <p className="text-slate-400 font-medium mt-1">Status Report for {mockBusiness.name}</p>
        </div>
        <div className="flex gap-2">
           <Badge variant="success">Active Pilot</Badge>
           <Badge variant="outline">Q2 Launch</Badge>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-indigo-600/5 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-3xl -mr-8 -mt-8" />
          <CardHeader className="pb-2">
            <CardDescription className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Project Health</CardDescription>
            <CardTitle className="text-3xl font-bold text-white">{progress}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-2 w-full bg-white/5 rounded-full mt-2">
              <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(99,102,241,0.5)]" style={{ width: `${progress}%` }} />
            </div>
            <p className="text-xs text-slate-500 mt-4 font-medium">2 milestones remaining for this phase.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>AI Engine Performance</CardDescription>
            <CardTitle>{mockRecommendations.length}</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
             <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                <TrendingUp size={14} />
                <span>+12.4% projected efficiency</span>
             </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Market Sentiment</CardDescription>
            <CardTitle className="leading-none">Very Positive</CardTitle>
          </CardHeader>
          <CardContent className="pt-2">
             <p className="text-xs text-slate-500 leading-relaxed font-medium">AI analysis of urban logistics sentiment in EU remains top-tier for 2026.</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Roadmap Snapshot */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight">Active Milestone</h2>
              <button className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-black transition-colors underline underline-offset-4 font-mono">View Full Roadmap</button>
           </div>

           <Card className="p-0 overflow-hidden">
              <div className="bg-neutral-50 p-6 border-b border-neutral-100 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-neutral-100">
                       <Package size={24} className="text-neutral-800" />
                    </div>
                    <div>
                        <p className="text-neutral-400 font-bold text-[10px] uppercase tracking-widest">In Progress</p>
                        <h4 className="font-bold text-lg">Beta Launch - Berlin</h4>
                    </div>
                 </div>
                 <ArrowUpRight size={20} className="text-neutral-300" />
              </div>
              <CardContent className="p-6 space-y-6">
                 <p className="text-sm text-neutral-500 leading-relaxed">Pilot test with 5 local retailers in Berlin-Mitte. Expected completion by June 15th.</p>
                 <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Operations</Badge>
                    <Badge variant="info">Priority: High</Badge>
                 </div>
              </CardContent>
           </Card>

           <div className="grid md:grid-cols-2 gap-4">
              {mockRecommendations.map((rec, i) => (
                <motion.div
                  key={rec.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="hover:border-black transition-colors cursor-pointer group h-full flex flex-col">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-[9px] px-1.5">{rec.category}</Badge>
                            <Zap size={14} className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <CardTitle className="text-base mt-2">{rec.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-sm text-neutral-500 line-clamp-2">{rec.description}</p>
                    </CardContent>
                    <CardFooter className="bg-neutral-50/50 p-3 mt-0 rounded-b-2xl border-t-0">
                        <span className="text-[10px] font-bold text-neutral-400 font-mono italic underline decoration-neutral-200">Impact: {rec.impact}</span>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Sidebar News/Updates */}
        <div className="lg:col-span-4 space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-white px-2">Market IQ</h2>
            <div className="space-y-4">
                {[1, 2, 3].map(i => (
                    <div key={i} className="group cursor-pointer p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                        <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1 font-mono">Market Pulse &bull; 2h ago</p>
                        <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">EU Green Fleet Subsidy Acts of 2026</h4>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">Brussels announces aggressive fleet conversion subsidies slated for Q4/2026 delivery...</p>
                    </div>
                ))}
            </div>
            
            <Card className="bg-indigo-600/10 border-indigo-500/20 text-white p-8 rounded-[40px] overflow-hidden relative group">
                <div className="absolute -top-12 -right-12 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <Briefcase size={120} />
                </div>
                <h4 className="text-xl font-bold mb-3 relative z-10">Scale your team?</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 relative z-10">Found 12 vetted CTO candidates with green-logistics domain expertise in Germany.</p>
                <Button size="md" variant="primary" className="w-full relative z-10">Review Candidates</Button>
            </Card>
        </div>
      </div>
    </div>
  );
}
