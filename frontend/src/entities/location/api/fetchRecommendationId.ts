import {
  RecommendationRequestBody,
  RecommendationIdResponse,
} from '@entities/location/types/api';

import { apiClient } from '@shared/api/apiClient';

export const fetchRecommendationId = async (
  requestBody: RecommendationRequestBody,
): Promise<string> => {
  const response = await apiClient.post<RecommendationIdResponse>(
    '/recommendations',
    requestBody,
  );

  return response.id;
};
