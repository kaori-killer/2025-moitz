import { LocationResponse } from '@entities/location/types/api';
import { Location } from '@entities/location/types/Location';
import { mapLocationResponseToDomain } from './mappers/locationMapper';

import { apiClient } from '@shared/api/apiClient';

export const fetchRecommendationResult = async (
  id: string,
): Promise<Location> => {
  const response = await apiClient.get<LocationResponse>(
    `/recommendations/${id}`,
  );

  return mapLocationResponseToDomain(response);
};
