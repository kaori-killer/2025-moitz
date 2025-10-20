import { modal } from '@features/modal/utils/modal';

import VoteModal from '../components/VoteModal';

const useVoteModal = () => {
  const openVoteModal = () => {
    return new Promise<void>((resolve) => {
      modal.open(({ unmount }) => {
        return (
          <VoteModal
            onClose={() => {
              resolve();
              unmount();
            }}
          />
        );
      });
    });
  };

  return {
    openVoteModal,
  };
};

export default useVoteModal;
