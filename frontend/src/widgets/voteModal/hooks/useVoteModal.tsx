import { modal } from '@features/modal/utils/modal';

import VoteModal from '../components/VoteModal';

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
