import { Recommendation, RoadmapItem, Update, Message, BusinessInfo } from '../types';

export const mockBusiness: BusinessInfo = {
  id: 'biz_1',
  name: 'EcoStream Logistics',
  description: 'AI-optimized green logistics for urban e-commerce deliveries.',
  industry: 'Logistics',
  stage: 'pre-launch',
  targetMarket: 'Retailers in major EU metropolitan areas.',
  goals: ['Zero-emission fleet by 2027', '80% delivery efficiency increase', 'SME partnership program'],
  createdAt: new Date().toISOString(),
};

export const mockRoadmap: RoadmapItem[] = [
  {
    id: '1',
    title: 'Finalize Business Entity',
    description: 'Complete registration of GmbH/LLC and obtain tax IDs.',
    status: 'completed',
    category: 'legal',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Beta Launch - Berlin',
    description: 'Pilot test with 5 local retailers in Berlin-Mitte.',
    status: 'in-progress',
    category: 'operations',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Series A Deck Preparation',
    description: 'Draft the initial pitch deck and financial projections.',
    status: 'todo',
    category: 'financial',
    priority: 'medium',
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'r1',
    title: 'Implement dynamic route pricing',
    description: 'Adjust delivery fees based on real-time traffic and demand.',
    impact: 'High (+12% margin)',
    difficulty: 'medium',
    category: 'Operations',
  },
  {
    id: 'r2',
    title: 'Switch to Bio-Polymer packaging',
    description: 'Offer carbon-neutral packaging options to SME partners.',
    impact: 'Medium (Brand Loyalty)',
    difficulty: 'easy',
    category: 'Marketing',
  },
];

export const mockMessages: Message[] = [
  {
    id: 'm1',
    role: 'assistant',
    content: "Hello! I've analyzed your current progress. You're 65% through your pre-launch phase. How can I help you accelerate the Berlin pilot?",
    timestamp: new Date().toISOString(),
  },
];

export const mockUpdates: Update[] = [
  {
    id: 'u1',
    title: 'EU Green Logistics Initiative 2026',
    content: 'New subsidies announced for electric delivery fleets starting next quarter.',
    type: 'regulatory',
    date: '2026-04-20',
  },
];
