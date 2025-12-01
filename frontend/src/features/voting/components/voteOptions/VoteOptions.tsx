import { VoteStatusResponse } from '@entities/location/api/fetchVoteStatus';

import BottomButton from '@shared/components/bottomButton/BottomButton';
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
  onClose: () => void;
  onSubmit: () => void;
}

// function VoteOptions({ onClose }: VoteOptionsProps) {
//   const [selectedOption, setSelectedOption] = useState<string>('');

//   const handleOptionChange = (id: string) => {
//     setSelectedOption((optionId) => {
//       if (optionId === id) {
//         return '';
//       }
//       return id;
//     });
//   };
// >>>>>>> fe-dev

function VoteOptions({
  selectedLocationName,
  onSelectionChange,
  voteStatus,
  isLoading,
  isError,
  refetch,
  onSubmit,
}: VoteOptionsProps) {
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
        <RefreshButton onRefresh={refetch} />
      </div>
      <div className="visually-hidden">
        투표 옵션 목록. 라디오 버튼으로 하나만 선택 가능합니다. 다른 옵션을
        선택하면 이전 선택이 해제됩니다.
      </div>

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
          <BottomButton
            text={'투표하기'}
            onClick={onSubmit}
            type="button"
            active={true}
          />
        </form>
      )}
    </section>
  );
}

export default VoteOptions;
