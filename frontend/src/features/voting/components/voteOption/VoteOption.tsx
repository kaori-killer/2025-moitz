import { flex, typography } from '@shared/styles/default.styled';

import VoteCountIcons from '../voteCountIcons/VoteCountIcons';

import * as voteOption from './voteOption.styled';

interface VoteOptionProps {
  option: {
    id: string;
    name: string;
    count: number;
  };
  isSelected: boolean;
  onToggle: (id: string) => void;
}

function VoteOption({ option, isSelected, onToggle }: VoteOptionProps) {
  return (
    <div
      css={[
        flex({ justify: 'space-between', align: 'center', gap: 8 }),
        voteOption.voteOption(),
      ]}
    >
      <input
        type="radio"
        id={option.id}
        name="vote-option"
        value={option.id}
        checked={isSelected}
        onChange={() => onToggle(option.id)}
        css={voteOption.checkbox()}
        aria-label={`${option.name}, ${option.count}명이 투표함`}
      />
      <label
        htmlFor={option.id}
        css={[typography.b2, voteOption.candidateName()]}
        aria-hidden="true"
      >
        {option.name}
      </label>

      <VoteCountIcons count={option.count} />
      <span css={[typography.c1, voteOption.voteCount()]} aria-hidden="true">
        {option.count}명
      </span>
    </div>
  );
}

export default VoteOption;
