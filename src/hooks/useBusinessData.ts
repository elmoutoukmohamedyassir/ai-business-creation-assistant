/**
 * Data abstraction hooks — currently backed by mock data.
 * To migrate to FastAPI: replace each hook body with a react-query useQuery call.
 *
 * Example FastAPI swap:
 *   import { useQuery } from '@tanstack/react-query';
 *   export function useRoadmap() {
 *     return useQuery({
 *       queryKey: ['roadmap'],
 *       queryFn: () => fetch('/api/roadmap').then(r => r.json())
 *     });
 *   }
 */

import { mockBusiness, mockRoadmap, mockRecommendations, mockUpdates, mockMessages } from '../data/mock';
import type { BusinessInfo, RoadmapItem, Recommendation, Update, Message } from '../types';

interface DataResult<T> {
  data: T;
  isLoading: false;
  error: null;
}

export function useBusiness(): DataResult<BusinessInfo> {
  return { data: mockBusiness, isLoading: false, error: null };
}

export function useRoadmap(): DataResult<RoadmapItem[]> {
  return { data: mockRoadmap, isLoading: false, error: null };
}

export function useRecommendations(): DataResult<Recommendation[]> {
  return { data: mockRecommendations, isLoading: false, error: null };
}

export function useUpdates(): DataResult<Update[]> {
  return { data: mockUpdates, isLoading: false, error: null };
}

export function useChatHistory(): DataResult<Message[]> {
  return { data: mockMessages, isLoading: false, error: null };
}