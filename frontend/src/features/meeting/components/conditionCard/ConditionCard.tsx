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
  const descriptionId = `description-${contentText.replace(/\s+/g, '-').toLowerCase()}`;

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
      aria-describedby={descriptionId}
    >
      <div css={[typography.b1, conditionCard.icon()]} aria-hidden="true">
        {iconText}
      </div>
      <div css={[typography.b1, conditionCard.text()]}>{contentText}</div>
      <div
        id={descriptionId}
        css={[typography.c2, conditionCard.description()]}
      >
        {descriptionText}
      </div>
    </button>
  );
}

export default ConditionCard;
