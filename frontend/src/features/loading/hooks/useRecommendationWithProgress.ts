import { useState, useCallback } from 'react';

import { useLocationsContext } from '@entities/location/contexts/useLocationsContext';
import { RecommendationRequestBody } from '@entities/location/types/api';

export type UseRecommendationWithProgressReturn = {
  isProgressLoading: boolean;
  getRecommendationFull: (
    requestBody: RecommendationRequestBody,
  ) => Promise<{ id: string }>;
};

const initialData = {
  requirement: 'NOT_SELECTED' as const,
  startingPlaces: [],
  recommendedLocations: [],
};

export const useRecommendationWithProgress = (): UseRecommendationWithProgressReturn => {
  const [isProgressLoading, setIsProgressLoading] = useState(false);
  const { getRecommendationId, getRecommendationResult, setData } = useLocationsContext();

  const getRecommendationFull = useCallback(
    async (requestBody: RecommendationRequestBody) => {
      setIsProgressLoading(true);
      setData(initialData);

      try {
        const id = await getRecommendationId(requestBody);
        await getRecommendationResult(id);

        // UI 타이밍 로직
        await new Promise((resolve) => setTimeout(resolve, 600));

        return { id };
      } finally {
        setIsProgressLoading(false);
      }
    },
    [getRecommendationId, getRecommendationResult, setData],
  );

  return {
    isProgressLoading,
    getRecommendationFull,
  };
};

