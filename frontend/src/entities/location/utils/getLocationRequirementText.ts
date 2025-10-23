import {
  LOCATION_REQUIREMENT_BASE,
  LocationRequirement,
} from '../types/LocationRequirement';

export const getLocationRequirementText = (
  requirement: LocationRequirement,
): string => {
  return LOCATION_REQUIREMENT_BASE[requirement].text;
};
