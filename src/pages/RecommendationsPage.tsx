import React from 'react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Progress } from '../components/ui/Progress';
import {
  Zap,
  TrendingUp,
  Target,
  ChevronRight,
  Filter,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { mockRecommendations } from '../data/mock';
import type { Recommendation, Difficulty } from '../types';
import { cn } from '../utils/cn';

type DifficultyFilter = Difficulty | 'all';

const DIFFICULTY_BADGE_VARIANT: Record<Difficulty, 'success' | 'warning' | 'danger'> = {
  easy: 'success',
  medium: 'warning',
  hard: 'danger',
};

const DIFFICULTY_FILTERS: DifficultyFilter[] = ['all', 'easy', 'medium', 'hard'];

export default function RecommendationsPage() {
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>('all');
  const [saved, setSaved] = useState<Set<string>>(new Set());

  const filtered =
    difficultyFilter === 'all'
      ? mockRecommendations
      : mockRecommendations.filter((r) => r.difficulty === difficultyFilter);

  const toggleSave = (id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const savedCount = saved.size;
  const implementedPct = Math.round((savedCount / mockRecommendations.length) * 100);

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-white uppercase italic">
            Intel Drop.
          </h1>
          <p className="text-slate-400 font-medium">
            {mockRecommendations.length} AI-generated strategic actions calibrated to your venture.
          </p>
        </div>
        <Badge variant="success" className="text-sm px-4 py-2 h-auto self-start md:self-end">
          <Sparkles size={14} className="mr-2 inline-block" aria-hidden="true" />
          Updated just now
        </Badge>
      </header>

      {/* Stats row */}
      <div className="grid sm:grid-cols-3 gap-6">
        <StatCard
          icon={<Zap size={20} className="text-amber-400" />}
          label="Total Actions"
          value={mockRecommendations.length}
          sub="AI-calibrated recommendations"
        />
        <StatCard
          icon={<Target size={20} className="text-emerald-400" />}
          label="Marked for Review"
          value={savedCount}
          sub={`${implementedPct}% of total pipeline`}
        />
        <StatCard
          icon={<TrendingUp size={20} className="text-indigo-400" />}
          label="Estimated Uplift"
          value="+28%"
          sub="Projected performance delta"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left — recommendation list */}
        <div className="lg:col-span-8 space-y-6">
          {/* Filters */}
          <div
            className="flex flex-wrap gap-2"
            role="group"
            aria-label="Filter recommendations by difficulty"
          >
            <Filter size={14} className="text-slate-500 self-center mr-1" aria-hidden="true" />
            {DIFFICULTY_FILTERS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficultyFilter(d)}
                aria-pressed={difficultyFilter === d}
                className={cn(
                  'px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all',
                  difficultyFilter === d
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                )}
              >
                {d === 'all' ? 'All Levels' : d}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="space-y-4" role="list" aria-label="Recommendations">
            {filtered.length === 0 && (
              <div className="text-center py-16 text-slate-500">
                <Filter size={32} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
                <p className="text-sm font-medium">No recommendations at this difficulty level.</p>
              </div>
            )}

            {filtered.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                role="listitem"
              >
                <RecommendationCard
                  rec={rec}
                  isSaved={saved.has(rec.id)}
                  onToggleSave={() => toggleSave(rec.id)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right — sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Pipeline progress */}
          <Card className="bg-indigo-600/5 border-white/5">
            <CardHeader>
              <CardDescription>Implementation Pipeline</CardDescription>
              <CardTitle className="text-2xl">{implementedPct}%</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress
                value={implementedPct}
                label={`Implementation pipeline: ${implementedPct}%`}
                className="h-2.5"
              />
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {savedCount} of {mockRecommendations.length} actions queued for review.{' '}
                {mockRecommendations.length - savedCount > 0
                  ? `${mockRecommendations.length - savedCount} still pending.`
                  : 'All actions reviewed!'}
              </p>
            </CardContent>
          </Card>

          {/* Category breakdown */}
          <div className="p-4 rounded-[32px] border border-white/5 bg-white/[0.01]">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-5 px-2">
              Category Breakdown
            </h4>
            <div className="space-y-3">
              {Object.entries(
                mockRecommendations.reduce<Record<string, number>>((acc, r) => {
                  acc[r.category] = (acc[r.category] ?? 0) + 1;
                  return acc;
                }, {})
              ).map(([category, count]) => (
                <div
                  key={category}
                  className="flex items-center justify-between px-3 py-2 rounded-2xl bg-white/5 border border-white/5"
                >
                  <span className="text-xs font-bold text-slate-300 capitalize">{category}</span>
                  <Badge variant="secondary" className="text-[10px]">
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-br from-indigo-600/20 to-purple-600/10 border-indigo-500/20">
            <CardContent className="pt-4 space-y-4">
              <h4 className="font-bold text-white text-lg">
                Need a custom playbook?
              </h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                Ask the AI Co-Pilot to generate a prioritized 90-day action plan tailored to your
                current phase.
              </p>
              <Button className="w-full gap-2">
                Open AI Assistant
                <ArrowUpRight size={16} aria-hidden="true" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="h-full">
        <CardContent className="pt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">{icon}</div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
          </div>
          <p className="text-3xl font-black tracking-tight text-white">{value}</p>
          <p className="text-xs text-slate-500 font-medium mt-1">{sub}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function RecommendationCard({
  rec,
  isSaved,
  onToggleSave,
}: {
  rec: Recommendation;
  isSaved: boolean;
  onToggleSave: () => void;
}) {
  return (
    <Card
      className={cn(
        'transition-all duration-300 p-0 overflow-hidden group',
        isSaved ? 'border-indigo-500/40 bg-indigo-600/5' : 'hover:border-white/20'
      )}
    >
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={DIFFICULTY_BADGE_VARIANT[rec.difficulty]}>
                {rec.difficulty}
              </Badge>
              <Badge variant="outline" className="text-[9px]">
                {rec.category}
              </Badge>
            </div>
            <h3 className="font-bold text-lg text-white leading-tight">{rec.title}</h3>
          </div>

          <button
            type="button"
            onClick={onToggleSave}
            aria-label={isSaved ? `Remove "${rec.title}" from review queue` : `Add "${rec.title}" to review queue`}
            aria-pressed={isSaved}
            className={cn(
              'shrink-0 p-2.5 rounded-xl border transition-all',
              isSaved
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                : 'border-white/10 text-slate-500 hover:border-indigo-500/50 hover:text-indigo-400'
            )}
          >
            <Zap size={16} aria-hidden="true" />
          </button>
        </div>

        <p className="text-sm text-slate-400 leading-relaxed">{rec.description}</p>

        <div className="flex items-center gap-3 pt-2 border-t border-white/5">
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">
              Expected Impact
            </p>
            <p className="text-xs font-bold text-emerald-400 italic">{rec.impact}</p>
          </div>
          <button
            type="button"
            aria-label={`View full details for ${rec.title}`}
            className="p-2 rounded-lg bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Card>
  );
}