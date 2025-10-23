import { useState, useCallback } from 'react';

import { fetchVote } from '@entities/location/api/fetchVote';
import {
  VoteRequestBody,
  VoteResponse,
} from '@entities/location/api/types/VoteAPI';

export type useVoteReturn = {
  voteData: VoteResponse | null;
  isVoting: boolean;
  isError: boolean;
  errorMessage: string;
  vote: (
    recommendationId: string,
    requestBody: VoteRequestBody,
  ) => Promise<VoteResponse>;
  resetVote: () => void;
};

const useVote = (): useVoteReturn => {
  const [voteData, setVoteData] = useState<VoteResponse | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const vote = useCallback(
    async (recommendationId: string, requestBody: VoteRequestBody) => {
      setIsVoting(true);
      setIsError(false);
      setErrorMessage('');

      try {
        const response = await fetchVote(recommendationId, requestBody);
        setVoteData(response);
        return response;
      } catch (error) {
        setIsError(true);
        setErrorMessage(error instanceof Error ? error.message : String(error));
        throw error;
      } finally {
        setIsVoting(false);
      }
    },
    [],
  );

  const resetVote = useCallback(() => {
    setVoteData(null);
    setIsError(false);
    setErrorMessage('');
  }, []);

  return {
    voteData,
    isVoting,
    isError,
    errorMessage,
    vote,
    resetVote,
  };
};

export default useVote;
