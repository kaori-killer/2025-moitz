import { useState, useCallback } from 'react';

import { fetchRecommendationId } from '@entities/location/api/fetchRecommendationId';
import { fetchRecommendationResult } from '@entities/location/api/fetchRecommendationResult';
import { RecommendationRequestBody } from '@entities/location/types/api';
import { Location } from '@entities/location/types/Location';

export type useLocationsReturn = {
  data: Location;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  getRecommendationId: (
    requestBody: RecommendationRequestBody,
  ) => Promise<string>;
  getRecommendationResult: (id: string) => Promise<Location>;
  setData: (data: Location) => void;
};

const initialData: Location = {
  requirement: 'NOT_SELECTED',
  startingPlaces: [],
  recommendedLocations: [],
};

const useLocations = (): useLocationsReturn => {
  const [data, setData] = useState<Location>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getRecommendationId = useCallback(
    async (requestBody: RecommendationRequestBody) => {
      setIsLoading(true);
      setIsError(false);
      setErrorMessage('');

      try {
        return await fetchRecommendationId(requestBody);
      } catch (error) {
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : String(error));
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const getRecommendationResult = useCallback(async (id: string) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const locations = await fetchRecommendationResult(id);
      setData(locations);
      return locations;
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : String(error));
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    data,
    isLoading,
    isError,
    errorMessage,
    getRecommendationId,
    getRecommendationResult,
    setData,
  };
};

export default useLocations;
