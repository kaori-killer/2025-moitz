import { useState } from 'react';

import RefreshButton from '@shared/components/RefreshButton/RefreshButton';
import { flex } from '@shared/styles/default.styled';

import VoteOption from '../voteOption/VoteOption';

import * as voteOptions from './voteOptions.styled';

const VOTE_OPTIONS = [
  { id: 'gangnam', name: '강남역', count: 5 },
  { id: 'hongdae', name: '홍대입구역', count: 3 },
  { id: 'jamsil', name: '잠실역', count: 2 },
  { id: 'myeongdong', name: '명동역', count: 1 },
  { id: 'itaewon', name: '이태원역', count: 4 },
];

function VoteOptions() {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleOptionChange = (id: string) => {
    setSelectedOption((optionId) => {
      if (optionId === id) {
        return '';
      }
      return id;
    });
  };

  return (
    <section
      css={[
        flex({ direction: 'column', align: 'center', gap: 5 }),
        voteOptions.candidateListWrapper(),
      ]}
    >
      <RefreshButton onRefresh={() => {}} />

      <form
        css={[
          flex({ direction: 'column', align: 'center', gap: 5 }),
          voteOptions.candidateList(),
        ]}
      >
        {VOTE_OPTIONS.map((option) => (
          <VoteOption
            key={option.id}
            option={option}
            isSelected={selectedOption === option.id}
            onToggle={handleOptionChange}
          />
        ))}
      </form>
    </section>
  );
}

export default VoteOptions;
