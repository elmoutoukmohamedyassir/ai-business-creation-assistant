// ─── Core Domain Types ────────────────────────────────────────────────────────

export type User = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

export type BusinessStage = 'idea' | 'planning' | 'pre-launch' | 'launched' | 'scaling';

export type BusinessInfo = {
  id: string;
  name: string;
  description: string;
  industry: string;
  stage: BusinessStage;
  targetMarket: string;
  goals: string[];
  createdAt: string;
};

// ─── Roadmap ──────────────────────────────────────────────────────────────────

export type RoadmapStatus = 'todo' | 'in-progress' | 'completed';

export type RoadmapCategory = 'legal' | 'marketing' | 'operations' | 'product' | 'financial';

export type RoadmapPriority = 'low' | 'medium' | 'high';

export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  category: RoadmapCategory;
  dueDate?: string;
  priority: RoadmapPriority;
};

// ─── Assistant ────────────────────────────────────────────────────────────────

export type MessageRole = 'user' | 'assistant';

export type Message = {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
};

// ─── Recommendations ──────────────────────────────────────────────────────────

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  impact: string;
  difficulty: Difficulty;
  category: string;
};

// ─── Updates ──────────────────────────────────────────────────────────────────

export type UpdateType = 'market' | 'internal' | 'regulatory';

export type Update = {
  id: string;
  title: string;
  content: string;
  type: UpdateType;
  date: string;
};

// ─── Forms ────────────────────────────────────────────────────────────────────

export type BusinessUpdateEntry = {
  id: string;
  timestamp: string;
  revenue?: string;
  expenses?: string;
  clients?: string;
  issue?: string;
  notes: string;
};