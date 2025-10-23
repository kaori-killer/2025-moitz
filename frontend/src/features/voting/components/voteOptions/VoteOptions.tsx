import { useState } from 'react';

import useVoteStatus from '@entities/location/hooks/useVoteStatus';

import RefreshButton from '@shared/components/RefreshButton/RefreshButton';
import { flex } from '@shared/styles/default.styled';

import VoteOption from '../voteOption/VoteOption';

import * as voteOptions from './voteOptions.styled';

interface VoteOptionsProps {
  recommendationId: string;
  onSelectionChange?: (selectedOption: string) => void;
}

function VoteOptions({
  recommendationId,
  onSelectionChange,
}: VoteOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const { voteStatus, isLoading, isError, refetch } =
    useVoteStatus(recommendationId);

  const handleOptionChange = (id: string) => {
    setSelectedOption((optionId) => {
      const newSelection = optionId === id ? '' : id;
      onSelectionChange?.(newSelection);
      return newSelection;
    });
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <section
      css={[
        flex({ direction: 'column', align: 'center', gap: 5 }),
        voteOptions.candidateListWrapper(),
      ]}
    >
      <RefreshButton onRefresh={handleRefresh} />

      {isLoading && <div>투표 현황을 불러오는 중...</div>}

      {isError && <div>투표 현황을 불러올 수 없습니다.</div>}

      {!isLoading && !isError && (
        <form
          css={[
            flex({ direction: 'column', align: 'center', gap: 5 }),
            voteOptions.candidateList(),
          ]}
        >
          {voteStatus.map((option, index) => (
            <VoteOption
              key={`${option.locationName}-${index}`}
              option={{
                id: option.locationName,
                name: option.locationName,
                count: option.count,
              }}
              isSelected={selectedOption === option.locationName}
              onToggle={handleOptionChange}
            />
          ))}
        </form>
      )}
    </section>
  );
}

export default VoteOptions;
