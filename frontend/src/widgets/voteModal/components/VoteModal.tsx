import Modal from '@features/modal/components/Modal';

import BottomButton from '@shared/components/bottomButton/BottomButton';
interface VoteModalProps {
  onClose: () => void;
}

function VoteModal({ onClose }: VoteModalProps) {
  return (
    <Modal onClose={onClose}>
      <div>이건 VoteModal 입니닷~</div>
      <BottomButton text="닫기" onClick={onClose} type="button" active={true} />
    </Modal>
  );
}

export default VoteModal;
