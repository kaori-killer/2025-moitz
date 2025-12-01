import React, { useEffect } from "react";
import { css } from "@emotion/react";

import * as bottomSheetView from "./bottomSheetView.styled";

interface BottomSheetViewProps {
  children: React.ReactNode;
  positionPercent: number;
  handleProps: React.HTMLAttributes<HTMLDivElement>;
  isAnimating: boolean;
  onContainerTransitionEnd: React.TransitionEventHandler<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;
}

function BottomSheetView({
  children,
  positionPercent,
  handleProps,
  isAnimating,
  onContainerTransitionEnd,
  containerRef,
}: BottomSheetViewProps) {
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translate3d(0, ${
        100 - positionPercent
      }%, 0)`;
    }
  }, [positionPercent]);

  return (
    <div
      css={[bottomSheetView.base(), isAnimating && bottomSheetView.animate()]}
      ref={containerRef}
      // CSS transition이 끝났을 때 호출되는 이벤트 핸들러
      onTransitionEnd={onContainerTransitionEnd}
    >
      <div css={[bottomSheetView.container()]}>
        <div css={[bottomSheetView.header()]} {...handleProps}>
          <span css={[bottomSheetView.handle()]} aria-hidden />
        </div>

        <div css={[bottomSheetView.content()]}>{children}</div>
      </div>
    </div>
  );
}

export default BottomSheetView;
