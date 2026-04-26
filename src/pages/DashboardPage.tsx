import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import { mockBusiness, mockRoadmap, mockRecommendations, mockUpdates } from '../data/mock';
import { ArrowUpRight, Package, Briefcase, TrendingUp, Zap, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const completedTasks = mockRoadmap.filter((t) => t.status === 'completed').length;
  const progress = Math.round((completedTasks / mockRoadmap.length) * 100);
  const inProgressTask = mockRoadmap.find((t) => t.status === 'in-progress');

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="text-slate-500 text-sm font-medium mb-1">
            Welcome back, {user?.name?.split(' ')[0] ?? 'Founder'}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-white">Market Overview</h1>
          <p className="text-slate-400 font-medium mt-1">
            Status report for{' '}
            <span className="text-indigo-400 font-bold">{mockBusiness.name}</span>
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="success">Active Pilot</Badge>
          <Badge variant="outline">Q2 Launch</Badge>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="bg-indigo-600/5 border-white/5 relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-3xl -mr-8 -mt-8" aria-hidden="true" />
            <CardHeader className="pb-2">
              <CardDescription>Project Health</CardDescription>
              <CardTitle className="text-3xl font-bold">{progress}%</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={progress}
                label={`Project health: ${progress}%`}
                className="h-2 mt-2"
              />
              <p className="text-xs text-slate-500 mt-4 font-medium">
                {mockRoadmap.length - completedTasks} milestones remaining for this phase.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardDescription>AI Engine Performance</CardDescription>
              <CardTitle className="text-3xl">{mockRecommendations.length}</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="flex items-center gap-1 text-emerald-400 font-bold text-xs">
                <TrendingUp size={14} aria-hidden="true" />
                <span>+12.4% projected efficiency</span>
              </div>
              <Link
                to="/recommendations"
                className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-3 font-bold"
              >
                View recommendations
                <ArrowUpRight size={12} />
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardDescription>Market Sentiment</CardDescription>
              <CardTitle>Very Positive</CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                AI analysis of urban logistics sentiment in EU remains top-tier for 2026.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content — 2-col on large screens */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: roadmap + recs — takes 2 cols */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-white">Active Milestone</h2>
            <Link
              to="/roadmap"
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors underline underline-offset-4"
            >
              View Full Roadmap
            </Link>
          </div>

          {inProgressTask ? (
            <Link to="/roadmap" className="block group">
              <Card className="p-0 overflow-hidden hover:border-indigo-500/30 transition-colors">
                <div className="bg-white/[0.02] p-6 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-600/20 p-3 rounded-2xl border border-indigo-500/20">
                      <Package size={22} className="text-indigo-400" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest">
                        In Progress
                      </p>
                      <h4 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                        {inProgressTask.title}
                      </h4>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-slate-600 group-hover:text-indigo-400 transition-colors"
                    aria-hidden="true"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {inProgressTask.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{inProgressTask.category}</Badge>
                    <Badge variant="info">Priority: {inProgressTask.priority}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ) : (
            <Card className="p-6 text-center text-slate-500">
              <p className="text-sm">All milestones completed. Add new ones in the Roadmap.</p>
            </Card>
          )}

          {/* Recommendations preview */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white">
              Latest Recommendations
            </h2>
            <Link
              to="/recommendations"
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors underline underline-offset-4"
            >
              See all
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {mockRecommendations.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Card className="hover:border-indigo-500/20 transition-colors cursor-pointer group h-full flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[9px] px-1.5">
                        {rec.category}
                      </Badge>
                      <Zap
                        size={14}
                        className="text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </div>
                    <CardTitle className="text-base mt-2">{rec.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-slate-500 line-clamp-2">{rec.description}</p>
                  </CardContent>
                  <CardFooter className="bg-white/[0.01] mt-0 border-t-0 px-0 pt-3">
                    <span className="text-[10px] font-bold text-slate-500 italic">
                      Impact: {rec.impact}
                    </span>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: updates — takes 1 col */}
        <div className="lg:col-span-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-white px-1">Market IQ</h2>
            <Link
              to="/updates"
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
            >
              <Bell size={14} />
            </Link>
          </div>

          <div className="space-y-2">
            {mockUpdates.map((update) => (
              <Link
                key={update.id}
                to="/updates"
                className="group block p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
              >
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">
                  {update.type} · {new Date(update.date).toLocaleDateString()}
                </p>
                <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                  {update.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {update.content}
                </p>
              </Link>
            ))}

            {/* Placeholder items so widget doesn't look empty */}
            {[1, 2].map((i) => (
              <div
                key={i}
                className="group cursor-pointer p-4 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
              >
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">
                  Market Pulse · 2h ago
                </p>
                <h4 className="font-bold text-sm text-white group-hover:text-indigo-300 transition-colors">
                  EU Green Fleet Subsidy Acts of 2026
                </h4>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  Brussels announces aggressive fleet conversion subsidies slated for Q4/2026
                  delivery...
                </p>
              </div>
            ))}
          </div>

          <Card className="bg-indigo-600/10 border-indigo-500/20 p-6 rounded-[32px] overflow-hidden relative group">
            <div
              className="absolute -top-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity"
              aria-hidden="true"
            >
              <Briefcase size={100} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2 relative z-10">
              Scale your team?
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed mb-4 relative z-10">
              Found 12 vetted CTO candidates with green-logistics domain expertise in Germany.
            </p>
            <Button size="sm" className="w-full relative z-10">
              Review Candidates
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}