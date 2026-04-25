import type {
  BusinessInfo,
  RoadmapItem,
  Message,
  Recommendation,
  Update,
} from '../types';

// ─── Business ────────────────────────────────────────────────────────────────

export const mockBusiness: BusinessInfo = {
  id: 'biz_001',
  name: 'EcoMove GmbH',
  description:
    'Next-generation last-mile delivery using AI-optimized electric cargo bikes and micro-depots across major EU cities.',
  industry: 'Logistics / GreenTech',
  stage: 'pre-launch',
  targetMarket: 'Berlin, Hamburg, Vienna — SME e-commerce segment',
  goals: [
    'Capture 5% of Berlin last-mile market by Q4 2026',
    'Achieve carbon-neutral operations from day one',
    'Onboard 50 enterprise clients by end of Series A',
  ],
  createdAt: '2026-01-15T09:00:00Z',
};

// ─── Roadmap ─────────────────────────────────────────────────────────────────

export const mockRoadmap: RoadmapItem[] = [
  {
    id: 'r_001',
    title: 'Register GmbH in Berlin (Commercial Register)',
    description:
      'File articles of association, appoint management board, and register at Amtsgericht Charlottenburg.',
    status: 'completed',
    category: 'legal',
    dueDate: '2026-02-01',
    priority: 'high',
  },
  {
    id: 'r_002',
    title: 'Secure Pilot Fleet Insurance (25 bikes)',
    description:
      'Source commercial liability and cargo coverage compliant with StVG §7 for powered cargo cycles.',
    status: 'completed',
    category: 'legal',
    dueDate: '2026-02-20',
    priority: 'high',
  },
  {
    id: 'r_003',
    title: 'Berlin Pilot Launch — Mitte District',
    description:
      'Deploy 25-bike fleet across 3 micro-depots in Mitte. Run with 5 enterprise anchor clients to validate unit economics.',
    status: 'in-progress',
    category: 'operations',
    dueDate: '2026-05-01',
    priority: 'high',
  },
  {
    id: 'r_004',
    title: 'Brand Identity & Website Launch',
    description:
      'Finalize logo, tone-of-voice guide, and launch full marketing site with SEO-optimized content.',
    status: 'in-progress',
    category: 'marketing',
    dueDate: '2026-04-15',
    priority: 'medium',
  },
  {
    id: 'r_005',
    title: 'Series A Pitch Deck — First Draft',
    description:
      'Complete investor narrative with traction metrics, competitive moat, financial model, and use-of-funds slide.',
    status: 'todo',
    category: 'financial',
    dueDate: '2026-06-01',
    priority: 'high',
  },
  {
    id: 'r_006',
    title: 'Fleet Management SaaS MVP',
    description:
      'Internal tool for real-time bike tracking, route optimization, and maintenance scheduling.',
    status: 'todo',
    category: 'product',
    dueDate: '2026-07-01',
    priority: 'medium',
  },
  {
    id: 'r_007',
    title: 'Enterprise Sales Outreach — 50 Targets',
    description:
      'Launch structured B2B outreach campaign targeting SME e-commerce and dark kitchen operators in Berlin.',
    status: 'todo',
    category: 'marketing',
    dueDate: '2026-05-15',
    priority: 'medium',
  },
  {
    id: 'r_008',
    title: 'EU Green Mobility Subsidy Application',
    description:
      'Apply for Berlin Senate Dept. of Transportation fleet electrification grants (up to €250k available).',
    status: 'todo',
    category: 'financial',
    dueDate: '2026-06-30',
    priority: 'low',
  },
];

// ─── AI Assistant ─────────────────────────────────────────────────────────────

export const mockMessages: Message[] = [
  {
    id: 'm_001',
    role: 'assistant',
    content:
      'Neural Co-Pilot online. I have full context on EcoMove GmbH — your pre-launch phase, Berlin Mitte pilot, and Series A timeline. What strategic action do you want to optimize today?',
    timestamp: '2026-04-25T09:00:00Z',
  },
  {
    id: 'm_002',
    role: 'user',
    content: 'What should I focus on this week to maximize my pilot traction?',
    timestamp: '2026-04-25T09:01:00Z',
  },
  {
    id: 'm_003',
    role: 'assistant',
    content:
      'Based on your current phase and the 3-week window before the pilot review, I recommend prioritizing three actions: (1) Activate your 5 anchor enterprise clients immediately — even 1 active delivery contract in Mitte generates real unit economics data you can show investors. (2) Close the fleet insurance gap — you cannot legally operate the full 25-bike fleet without StVG §7 coverage. (3) Push the brand site live even as an MVP — digital presence establishes credibility for enterprise sales calls next month.',
    timestamp: '2026-04-25T09:01:30Z',
  },
];

// ─── Recommendations ──────────────────────────────────────────────────────────

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec_001',
    title: 'Activate Anchor Enterprise Client Pipeline',
    description:
      'Convert at least 2 of your 5 pilot anchor clients to active delivery contracts this week. Real volume data is the most powerful lever for your Series A narrative.',
    impact: '+40% investor readiness score',
    difficulty: 'medium',
    category: 'sales',
  },
  {
    id: 'rec_002',
    title: 'Apply for Berlin Green Fleet Subsidy',
    description:
      'The Berlin Senate transport electrification window closes June 30. A €150k–€250k grant directly funds 15 additional bikes, reducing fleet capex by ~30%.',
    impact: '€150k–250k non-dilutive funding',
    difficulty: 'easy',
    category: 'financial',
  },
  {
    id: 'rec_003',
    title: 'Publish Thought Leadership on LinkedIn',
    description:
      'Weekly posts on urban logistics and EU green transport policy build an inbound pipeline. Target Berlin logistics and VC decision-makers with data-driven content.',
    impact: '+22% inbound enterprise lead rate',
    difficulty: 'easy',
    category: 'marketing',
  },
  {
    id: 'rec_004',
    title: 'Integrate Real-Time Route Optimization API',
    description:
      'Deploying a routing API (e.g. GraphHopper or HERE) in the dispatch layer can reduce delivery time-per-order by up to 18%, directly improving your unit economics.',
    impact: '−18% delivery time, +11% margin',
    difficulty: 'hard',
    category: 'product',
  },
  {
    id: 'rec_005',
    title: 'Formalize Co-Founder IP Assignment',
    description:
      'Before any investor due diligence, ensure all co-founder IP is formally assigned to EcoMove GmbH. Missing this is a common Series A deal-breaker.',
    impact: 'Eliminates critical legal risk',
    difficulty: 'easy',
    category: 'legal',
  },
  {
    id: 'rec_006',
    title: 'Build a 24-Month Financial Model',
    description:
      'Investors expect a bottom-up revenue model with three scenarios. Hire a fractional CFO or use the AI assistant to draft your assumptions and projection tables.',
    impact: 'Prerequisite for Series A closing',
    difficulty: 'hard',
    category: 'financial',
  },
];

// ─── Updates ──────────────────────────────────────────────────────────────────

export const mockUpdates: Update[] = [
  {
    id: 'upd_001',
    title: 'Germany Expands E-Cargo Bike Lane Access',
    content:
      'The Bundesrat passed a resolution granting e-cargo bikes full access to dedicated bus and bike lanes in cities above 100k population — effective June 2026. This reduces EcoMove delivery ETAs by an estimated 12–15% in Berlin.',
    type: 'regulatory',
    date: '2026-04-22T08:00:00Z',
  },
  {
    id: 'upd_002',
    title: 'Competitor Gorillas Logistics Cuts Berlin Fleet by 30%',
    content:
      'Gorillas has quietly reduced its Berlin courier fleet following a cash-flow crisis. This opens a direct window for EcoMove to capture the Prenzlauer Berg and Friedrichshain enterprise segments.',
    type: 'market',
    date: '2026-04-18T14:30:00Z',
  },
  {
    id: 'upd_003',
    title: 'Pilot KPI Report — Week 3',
    content:
      'Internal metrics show 94% on-time delivery rate, average 28-minute delivery time, and 4.7/5.0 merchant satisfaction score across Mitte pilot operations. Above initial projections.',
    type: 'internal',
    date: '2026-04-15T10:00:00Z',
  },
];