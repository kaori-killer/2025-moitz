import { apiClient } from '@shared/api/apiClient';

export interface VoteStatusResponse {
  locationName: string;
  count: number;
}

export const fetchVoteStatus = async (
  recommendationId: string,
): Promise<VoteStatusResponse[]> => {
  const response = await apiClient.get<VoteStatusResponse[]>(
    `/recommendations/${recommendationId}/votes`,
  );
  return response;
};
