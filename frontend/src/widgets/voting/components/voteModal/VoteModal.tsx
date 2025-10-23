import Modal from '@features/modal/components/Modal';
import VoteOptions from '@features/voting/components/voteOptions/VoteOptions';

import useVoteStatus from '@entities/location/hooks/useVoteStatus';

import { flex } from '@shared/styles/default.styled';

import useVoteForm from '../../hooks/useVoteForm';
import VoteHeader from '../voteHeader/VoteHeader';

import * as voteModal from './voteModal.styled';
interface VoteModalProps {
  onClose: () => void;
  recommendationId: string;
}

function VoteModal({ onClose, recommendationId }: VoteModalProps) {
  const {
    selectedLocationName,
    setSelectedLocationName,
    handleVote,
    isError,
    errorMessage,
  } = useVoteForm();
  const {
    voteStatus,
    isLoading,
    isError: statusError,
    refetch,
    updateVoteCount,
  } = useVoteStatus(recommendationId);

  const handleVoteClick = async () => {
    await handleVote(recommendationId, updateVoteCount);
    onClose();
  };

  if (isError) {
    return <div>투표 실패</div>;
  }

  return (
    <Modal onClose={onClose}>
      <main
        role="dialog"
        aria-modal="true"
        css={flex({
          direction: 'column',
          justify: 'center',
          align: 'center',
          gap: 20,
        })}
      >
        <VoteHeader
          title="어디로 갈까요?"
          description="투표로 만날 지역을 정해보세요!"
          subDescription="링크를 받은 사람들과 투표할 수 있어요"
        />
        <VoteOptions
          selectedLocationName={selectedLocationName}
          onSelectionChange={setSelectedLocationName}
          voteStatus={voteStatus}
          isLoading={isLoading}
          isError={statusError}
          refetch={refetch}
          onClose={onClose}
          onSubmit={handleVoteClick}
        />
        {errorMessage && (
          <div css={voteModal.errorMessage()}>{errorMessage}</div>
        )}
      </main>
    </Modal>
  );
}

export default VoteModal;
