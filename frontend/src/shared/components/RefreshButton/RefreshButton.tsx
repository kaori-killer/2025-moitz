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
      <img
        src={IconRefresh}
        alt="새로고침 아이콘"
        css={refreshButton.refreshIcon()}
      />
      <p>새로고침</p>
    </button>
  );
}

export default RefreshButton;
