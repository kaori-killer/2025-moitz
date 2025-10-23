import { modal } from '@features/modal/utils/modal';

import VoteModal from '../components/voteModal/VoteModal';

const useVoteModal = () => {
  const openVoteModal = (recommendationId: string) => {
    return new Promise<void>((resolve) => {
      modal.open(({ unmount }) => {
        return (
          <VoteModal
            onClose={() => {
              resolve();
              unmount();
            }}
            recommendationId={recommendationId}
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
