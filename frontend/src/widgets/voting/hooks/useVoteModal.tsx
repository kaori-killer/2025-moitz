import { modal } from '@features/modal/utils/modal';

import VoteModal from '../components/voteModal/VoteModal';

const useVoteModal = () => {
  const openVoteModal = () => {
    modal.open(({ unmount }) => {
      return (
        <VoteModal
          onClose={() => {
            unmount();
          }}
        />
      );
    });
  };

  return {
    openVoteModal,
  };
};

export default useVoteModal;


