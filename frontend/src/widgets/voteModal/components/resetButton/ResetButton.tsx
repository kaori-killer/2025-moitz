import { flex } from '@shared/styles/default.styled';

import IconRefresh from '@icons/icon-refresh.svg';

import * as resetButton from './resetButton.styled';

interface ResetButtonProps {
  onReset: () => void;
}

function ResetButton({ onReset }: ResetButtonProps) {
  return (
    <div
      css={[
        flex({ justify: 'flex-end', align: 'center' }),
        resetButton.resetButtonWrapper(),
      ]}
    >
      <button css={[resetButton.resetButton()]} type="button" onClick={onReset}>
        <img
          src={IconRefresh}
          alt="새로고침 아이콘"
          css={resetButton.refreshIcon()}
        />
        새로고침
      </button>
    </div>
  );
}

export default ResetButton;
