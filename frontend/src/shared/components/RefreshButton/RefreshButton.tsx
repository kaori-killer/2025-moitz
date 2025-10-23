import { flex } from '@shared/styles/default.styled';

import IconRefresh from '@icons/icon-refresh.svg';

import * as refreshButton from './refreshButton.styled';

interface refreshButtonProps {
  onRefresh: () => void;
}

function RefreshButton({ onRefresh }: refreshButtonProps) {
  return (
    <button
      css={[flex({ align: 'center', gap: 5 }), refreshButton.refreshButton()]}
      type="button"
      onClick={onRefresh}
    >
      <button
        css={[flex({ align: 'center', gap: 5 }), refreshButton.refreshButton()]}
        type="button"
        onClick={onRefresh}
        aria-label="투표 현황 새로고침"
      >
        <img
          src={IconRefresh}
          alt=""
          css={refreshButton.refreshIcon()}
          aria-hidden="true"
        />
        <p aria-hidden="true">새로고침</p>
      </button>
    </div>
  );
}

export default RefreshButton;
