import { useState } from 'react';

import BottomButton from '@shared/components/bottomButton/BottomButton';
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

interface VoteOptionsProps {
  onClose: () => void;
}

function VoteOptions({ onClose }: VoteOptionsProps) {
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
      <div
        css={[
          flex({ justify: 'flex-end', align: 'center' }),
          voteOptions.refreshButtonWrapper(),
        ]}
      >
        <RefreshButton onRefresh={() => {}} />
      </div>

      <div className="visually-hidden">
        투표 옵션 목록. 라디오 버튼으로 하나만 선택 가능합니다. 다른 옵션을
        선택하면 이전 선택이 해제됩니다.
      </div>

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
        <BottomButton
          text={'투표하기'}
          onClick={onClose}
          type="button"
          active={true}
        />
      </form>
    </section>
  );
}

export default VoteOptions;
