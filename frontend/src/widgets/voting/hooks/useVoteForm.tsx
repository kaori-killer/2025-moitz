/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';

import useVote from '@entities/location/hooks/useVote';

export type useVoteFormReturn = {
  selectedLocationName: string;
  setSelectedLocationName: (name: string) => void;
  handleVote: (
    recommendationId: string,
    updateVoteCount: (locationName: string) => void,
  ) => Promise<void>;
  isVoting: boolean;
  isError: boolean;
  errorMessage: string;
  clearError: () => void;
};

const useVoteForm = (): useVoteFormReturn => {
  const { isVoting, isError, vote } = useVote();
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleVote = async (
    recommendationId: string,
    updateVoteCount: (locationName: string) => void,
  ) => {
    if (!selectedLocationName) {
      setErrorMessage('지역을 선택해주세요');
      return;
    }

    try {
      await vote(recommendationId, {
        locationName: selectedLocationName,
      });
      updateVoteCount(selectedLocationName);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('투표에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const clearError = () => {
    setErrorMessage('');
  };

  return {
    selectedLocationName,
    setSelectedLocationName,
    handleVote,
    isVoting,
    isError,
    errorMessage,
    clearError,
  };
};

export default useVoteForm;
