import { VoteStatusResponse } from '@entities/location/api/fetchVoteStatus';

import RefreshButton from '@shared/components/RefreshButton/RefreshButton';
import { flex } from '@shared/styles/default.styled';

import VoteOption from '../voteOption/VoteOption';

import * as voteOptions from './voteOptions.styled';

interface VoteOptionsProps {
  selectedLocationName: string;
  onSelectionChange?: (selectedOption: string) => void;
  voteStatus: VoteStatusResponse[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => Promise<void>;
}

function VoteOptions({
  selectedLocationName,
  onSelectionChange,
  voteStatus,
  isLoading,
  isError,
  refetch,
}: VoteOptionsProps) {
  return (
    <section
      css={[
        flex({ direction: 'column', align: 'center', gap: 5 }),
        voteOptions.candidateListWrapper(),
      ]}
    >
      <RefreshButton onRefresh={refetch} />

      {isLoading && (
        <div
          css={[
            flex({
              direction: 'column',
              align: 'center',
              justify: 'center',
              gap: 5,
            }),
            voteOptions.loadingContainer(),
          ]}
        >
          <div>투표 현황을 불러오는 중...</div>
        </div>
      )}

      {isError && (
        <div
          css={[
            flex({
              direction: 'column',
              align: 'center',
              justify: 'center',
              gap: 5,
            }),
            voteOptions.errorContainer(),
          ]}
        >
          <div>투표 현황을 불러올 수 없습니다.</div>
        </div>
      )}

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
              isSelected={selectedLocationName === option.locationName}
              onToggle={(id) => onSelectionChange?.(id)}
            />
          ))}
        </form>
      )}
    </section>
  );
}

export default VoteOptions;
