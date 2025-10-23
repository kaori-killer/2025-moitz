import {
  VoteRequestBody,
  VoteResponse,
} from '@entities/location/api/types/VoteAPI';

import { apiClient } from '@shared/api/apiClient';

export const fetchVote = async (
  id: string,
  requestBody: VoteRequestBody,
): Promise<VoteResponse> => {
  const response = await apiClient.patch<VoteResponse>(
    `/recommendations/${id}/votes`,
    requestBody,
  );

  return response;
};
