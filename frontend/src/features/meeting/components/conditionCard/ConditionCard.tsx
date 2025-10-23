import { flex, typography } from '@shared/styles/default.styled';

import * as conditionCard from './conditionCard.styled';

interface ConditionCardProps {
  iconText: string;
  contentText: string;
  descriptionText: string;
  onClick: () => void;
  isSelected?: boolean;
}

function ConditionCard({
  iconText,
  contentText,
  descriptionText,
  onClick,
  isSelected = false,
}: ConditionCardProps) {
  return (
    <button
      css={[
        flex({ direction: 'column', align: 'center', gap: 5 }),
        conditionCard.base(),
        isSelected && conditionCard.selected(),
      ]}
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={contentText}
    >
      <div css={[typography.b1, conditionCard.icon()]} aria-hidden="true">
        {iconText}
      </div>
      <div css={[typography.b1, conditionCard.text()]}>{contentText}</div>
      <div css={[typography.c2, conditionCard.description()]}>
        {descriptionText}
      </div>
    </button>
  );
}

export default ConditionCard;
