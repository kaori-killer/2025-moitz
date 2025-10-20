import { CONDITION_CARD_TEXT } from '@features/meeting/constants/conditionCard';
import { INPUT_FORM_TEXT } from '@features/meeting/constants/inputForm';

import ConditionCard from '../conditionCard/ConditionCard';
import InputFormSection from '../meetingFormSection/MeetingFormSection';

import * as conditionSelector from './conditionSelector.styled';

interface ConditionSelectorProps {
  selectedConditionIDs: string[];
  onSelect: (condition: string) => void;
}

function ConditionSelector({
  selectedConditionIDs,
  onSelect,
}: ConditionSelectorProps) {
  const handleConditionCardClick = (condition: string) => {
    onSelect(condition);
  };

  return (
    <InputFormSection
      iconText={INPUT_FORM_TEXT.CONDITION.ICON}
      titleText={INPUT_FORM_TEXT.CONDITION.TITLE}
      descriptionText={INPUT_FORM_TEXT.CONDITION.DESCRIPTION}
    >
      <div css={conditionSelector.container()}>
        {Object.values(CONDITION_CARD_TEXT).map((condition) => (
          <ConditionCard
            key={condition.ID}
            iconText={condition.ICON}
            contentText={condition.TEXT}
            isSelected={selectedConditionIDs.includes(condition.ID)}
            onClick={() => handleConditionCardClick(condition.ID)}
          />
        ))}
      </div>
    </InputFormSection>
  );
}

export default ConditionSelector;
