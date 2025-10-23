import Modal from '@features/modal/components/Modal';
import VoteOptions from '@features/voting/components/voteOptions/VoteOptions';

import BottomButton from '@shared/components/bottomButton/BottomButton';
import { flex } from '@shared/styles/default.styled';

import VoteHeader from '../voteHeader/VoteHeader';

interface VoteModalProps {
  onClose: () => void;
}

function VoteModal({ onClose }: VoteModalProps) {
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
        <VoteOptions />
        <BottomButton
          text={'투표하기'}
          onClick={onClose}
          type="button"
          active={true}
        />
      </main>
    </Modal>
  );
}

export default VoteModal;
