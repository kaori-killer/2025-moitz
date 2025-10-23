import { useState, useEffect, useCallback } from 'react';

import {
  fetchVoteStatus,
  VoteStatusResponse,
} from '@entities/location/api/fetchVoteStatus';

export type useVoteStatusReturn = {
  voteStatus: VoteStatusResponse[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  refetch: () => Promise<void>;
  updateVoteCount: (locationName: string) => void;
};

const useVoteStatus = (recommendationId: string): useVoteStatusReturn => {
  const [voteStatus, setVoteStatus] = useState<VoteStatusResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = useCallback(async () => {
    if (!recommendationId) return;

    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const response = await fetchVoteStatus(recommendationId);
      setVoteStatus(response);
    } catch (error) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  }, [recommendationId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateVoteCount = useCallback((locationName: string) => {
    setVoteStatus((prevStatus) =>
      prevStatus.map((item) => {
        if (item.locationName === locationName) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      }),
    );
  }, []);

  return {
    voteStatus,
    isLoading,
    isError,
    errorMessage,
    refetch: fetchData,
    updateVoteCount,
  };
};

export default useVoteStatus;
