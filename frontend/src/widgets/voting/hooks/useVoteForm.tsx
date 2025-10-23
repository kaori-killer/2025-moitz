import { useState } from 'react';

import useVote from '@entities/location/hooks/useVote';

export type useVoteFormReturn = {
  selectedLocationName: string;
  setSelectedLocationName: (name: string) => void;
  handleVote: () => Promise<void>;
  isVoting: boolean;
  isError: boolean;
};

const useVoteForm = (recommendationId: string): useVoteFormReturn => {
  const { isVoting, isError, vote } = useVote();
  const [selectedLocationName, setSelectedLocationName] = useState<string>('');

  const handleVote = async () => {
    if (!selectedLocationName) {
      console.error('역을 선택해주세요');
      return;
    }

    try {
      const result = await vote(recommendationId, {
        locationName: selectedLocationName,
      });
      console.log('투표 결과:', result);
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
