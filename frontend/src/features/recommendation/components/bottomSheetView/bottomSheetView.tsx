import React from 'react';

import Modal from '@features/modal/components/Modal';
import useModal from '@features/modal/hooks/useModal';

import MapVoteButton from '@shared/components/mapVoteButton/MapVoteButton';
import { flex, scroll, shadow } from '@shared/styles/default.styled';

import * as bottomSheetView from './bottomSheetView.styled';

interface BottomSheetViewProps {
  children: React.ReactNode;
  positionPercent: number;
  handleProps: React.HTMLAttributes<HTMLDivElement>;
  isAnimating: boolean;
  onContainerTransitionEnd: React.TransitionEventHandler<HTMLDivElement>;
}

function BottomSheetView({
  children,
  positionPercent,
  handleProps,
  isAnimating,
  onContainerTransitionEnd,
}: BottomSheetViewProps) {
  const { isModalOpen, handleModalOpen, handleModalClose } = useModal();

  return (
    <div css={[bottomSheetView.base()]}>
      <div
        css={[
          flex({ direction: 'column' }),
          shadow.bottom_sheet,
          bottomSheetView.container(positionPercent),
          isAnimating && bottomSheetView.animate(),
        ]}
        // CSS transition이 끝났을 때 호출되는 이벤트 핸들러
        onTransitionEnd={onContainerTransitionEnd}
      >
        <div css={bottomSheetView.voteButtonWrapper()}>
          <MapVoteButton
            onClick={() => {
              handleModalOpen();
            }}
          />
        </div>

        <div css={[bottomSheetView.header()]} {...handleProps}>
          <span css={[bottomSheetView.handle()]} aria-hidden />
        </div>

        <div
          css={[
            flex({ direction: 'column', gap: 20 }),
            scroll,
            bottomSheetView.content(),
          ]}
        >
          {children}
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={handleModalClose}>
          <div>모달 내용을 여기에 작성하세요</div>
        </Modal>
      )}
    </div>
  );
}

export default BottomSheetView;
