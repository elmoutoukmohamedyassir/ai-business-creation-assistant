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

export type RoadmapStatus = 'todo' | 'in-progress' | 'completed';

export type RoadmapItem = {
  id: string;
  title: string;
  description: string;
  status: RoadmapStatus;
  category: 'legal' | 'marketing' | 'operations' | 'product' | 'financial';
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
};

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export type Recommendation = {
  id: string;
  title: string;
  description: string;
  impact: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
};

export type Update = {
  id: string;
  title: string;
  content: string;
  type: 'market' | 'internal' | 'regulatory';
  date: string;
};
