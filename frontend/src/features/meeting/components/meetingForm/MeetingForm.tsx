import React from 'react';
import { useNavigate } from 'react-router';

import { useFormInfo } from '@features/meeting/hooks/useFormInfo';
import { useToastActionsContext } from '@features/toast/hooks/useToastActionsContext';

import { useLocationsContext } from '@entities/location/contexts/useLocationsContext';
import { setMeetingStorage } from '@entities/location/model/meetingStorage';

import { flex } from '@shared/styles/default.styled';

import { ValidationError } from '@shared/types/validationError';

import ConditionSelector from '../conditionSelector/ConditionSelector';
import DepartureInput from '../departureInput/DepartureInput';
import MeetingFormBottomButton from '../meetingFormButton/meetingFormButton';

function MeetingForm() {
  let navigate = useNavigate();

  const {
    departureList,
    conditionIDs,
    addDepartureWithValidation,
    removeDepartureAtIndex,
    updateConditionID,
    validateFormSubmit,
  } = useFormInfo();
  const { showToast } = useToastActionsContext();

  const { getRecommendationFull } = useLocationsContext();

  const isValid = React.useMemo(
    () => validateFormSubmit().isValid,
    [departureList, conditionIDs],
  );

  const showValidationError = (error: ValidationError) => {
    if (!error.isValid) {
      showToast(error.message);
    }
  };

  const handleAddDeparture = (value: string) => {
    const validationResult = addDepartureWithValidation(value);
    if (!validationResult.isValid) {
      showValidationError(validationResult);
      return;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formValidation = validateFormSubmit();
    if (!formValidation.isValid) {
      showValidationError(formValidation);
      return;
    }

    try {
      const { id } = await getRecommendationFull({
        startingPlaceNames: departureList,
        requirements: conditionIDs,
      });

      if (id) navigate(`/result/${id}`);
    } catch {
      showToast('모임 지역 찾기에 실패했습니다.');
    }

    setMeetingStorage({ departureList, conditionIDs });
  };

  return (
    <form css={flex({ direction: 'column', gap: 80 })} onSubmit={handleSubmit}>
      <div css={flex({ direction: 'column', gap: 50 })}>
        <DepartureInput
          departureList={departureList}
          onAddDeparture={handleAddDeparture}
          onRemoveDeparture={removeDepartureAtIndex}
        />

        <ConditionSelector
          selectedConditionIDs={conditionIDs}
          onSelect={updateConditionID}
        />
      </div>

      <MeetingFormBottomButton active={isValid} />
    </form>
  );
}

export default MeetingForm;
