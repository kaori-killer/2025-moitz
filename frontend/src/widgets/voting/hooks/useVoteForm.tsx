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
};

const useVoteForm = (): useVoteFormReturn => {
  const { isVoting, isError, vote } = useVote();
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');

  const handleVote = async (
    recommendationId: string,
    updateVoteCount: (locationName: string) => void,
  ) => {
    if (!selectedLocationName) {
      console.error('역을 선택해주세요');
      return;
    }

    try {
      await vote(recommendationId, {
        locationName: selectedLocationName,
      });

      updateVoteCount(selectedLocationName);
    } catch (error) {
      console.error('투표 실패:', error);
    }
  };

  return {
    selectedLocationName,
    setSelectedLocationName,
    handleVote,
    isVoting,
    isError,
  };
};

export default useVoteForm;
