import { LocationRequirement } from '@entities/location/types/LocationRequirement';

const MEETING_DEPARTURE_LIST = 'meeting:departures';
const MEETING_CONDITION_ID = 'meeting:conditionId';

const VALID_LOCATION_REQUIREMENTS: LocationRequirement[] = [
  'CAFE',
  'RESTAURANT',
  'BAR',
  'STUDY_CAFE',
  'SPACE_RENTAL',
  'PC_ROOM_KARAOKE',
  'ACTIVITY',
  'ENTERTAINMENT',
];

export function setMeetingStorage(params: {
  departureList: string[];
  conditionIDs: LocationRequirement[];
}) {
  localStorage.setItem(
    MEETING_DEPARTURE_LIST,
    JSON.stringify(params.departureList),
  );
  localStorage.setItem(
    MEETING_CONDITION_ID,
    JSON.stringify(params.conditionIDs),
  );
}

export function getMeetingStorage(): {
  departureList: string[];
  conditionIDs: LocationRequirement[];
} {
  const departureList = getValidDepartureList();
  const conditionIDs = getValidConditionIDs();

  return { departureList, conditionIDs };
}

function getValidDepartureList(): string[] {
  try {
    const stored = localStorage.getItem(MEETING_DEPARTURE_LIST);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === 'string')
    ) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

function getValidConditionIDs(): LocationRequirement[] {
  try {
    const stored = localStorage.getItem(MEETING_CONDITION_ID);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    if (Array.isArray(parsed) && parsed.every(isValidLocationRequirement)) {
      return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

function isValidLocationRequirement(
  item: unknown,
): item is LocationRequirement {
  return (
    typeof item === 'string' &&
    VALID_LOCATION_REQUIREMENTS.includes(item as LocationRequirement)
  );
}
