import Modal from '@features/modal/components/Modal';
import VoteOptions from '@features/voting/components/voteOptions/VoteOptions';

import BottomButton from '@shared/components/bottomButton/BottomButton';
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
    isVoting,
    isError,
  } = useVoteForm(recommendationId);

  if (isVoting) {
    return <div>투표 중...</div>;
  }

  if (isError) {
    return <div>투표 실패</div>;
  }

  return (
    <Modal onClose={onClose}>
      <main
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
          recommendationId={recommendationId}
          onSelectionChange={setSelectedLocationName}
        />
        <footer css={voteModal.footer()}>
          <BottomButton
            text={'투표하기'}
            onClick={handleVote}
            type="button"
            active={!!selectedLocationName}
          />
        </footer>
      </main>
    </Modal>
  );
}

export default VoteModal;
