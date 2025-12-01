import { useState } from 'react';

import {
  validateDepartureListMaxLength,
  validateStationName,
  validateDuplicateDeparture,
  validateForm,
} from '@features/meeting/lib/formValidation';

import { getMeetingStorage } from '@entities/location/model/meetingStorage';
import { LocationRequirement } from '@entities/location/types/LocationRequirement';

import { ValidationError } from '@shared/types/validationError';

type UseFormInfoReturn = {
  departureList: string[];
  conditionIDs: LocationRequirement[];
  addDepartureWithValidation: (departure: string) => ValidationError;
  removeDepartureAtIndex: (index: number) => void;
  updateConditionID: (condition: LocationRequirement) => void;
  validateFormSubmit: () => ValidationError;
};

export function useFormInfo(): UseFormInfoReturn {
  const storage = getMeetingStorage();
  const [departureList, setDepartureList] = useState<string[]>(
    storage.departureList,
  );
  const [conditionIDs, setConditionIDs] = useState<LocationRequirement[]>(
    storage.conditionIDs,
  );

  const addDepartureWithValidation = (departure: string): ValidationError => {
    const stationNameValidation = validateStationName(departure);
    if (!stationNameValidation.isValid) {
      return stationNameValidation;
    }

    const duplicateValidation = validateDuplicateDeparture(
      departureList,
      departure,
    );
    if (!duplicateValidation.isValid) {
      return duplicateValidation;
    }

    const lengthValidation = validateDepartureListMaxLength(
      departureList.length,
    );
    if (!lengthValidation.isValid) {
      return lengthValidation;
    }

    setDepartureList((prev) => [...prev, departure]);
    return { isValid: true, message: '' };
  };

  const removeDepartureAtIndex = (index: number) => {
    setDepartureList((prev) => prev.filter((_, i) => i !== index));
  };

  const updateConditionID = (condition: LocationRequirement) => {
    setConditionIDs((prev) => {
      if (prev.includes(condition)) {
        return prev.filter((id) => id !== condition);
      }
      return [...prev, condition];
    });
  };

  const validateFormSubmit = (): ValidationError => {
    return validateForm(departureList, conditionIDs);
  };

  return {
    departureList,
    conditionIDs,
    addDepartureWithValidation,
    removeDepartureAtIndex,
    updateConditionID,
    validateFormSubmit,
  };
}
