import { modal } from '@features/modal/utils/modal';

import VoteModal from '../components/voteModal/VoteModal';

const useVoteModal = () => {
  const openVoteModal = (recommendationId: string) => {
    modal.open(({ unmount }) => {
      return (
        <VoteModal
          onClose={() => {
            unmount();
          }}
          recommendationId={recommendationId}
        />
      );
    });
  };

  return {
    openVoteModal,
  };
};

export default useVoteModal;
