import {
  LOCATION_REQUIREMENT_BASE,
  LocationRequirement,
} from '@entities/location/types/LocationRequirement';

/**
 * UI 전용 데이터
 * 아이콘과 같은 표현 계층의 데이터만 포함
 */
type LocationRequirementUI = Record<
  LocationRequirement,
  {
    ICON: string;
    DESCRIPTION?: string;
  }
>;

const LOCATION_REQUIREMENT_UI: LocationRequirementUI = {
  CAFE: {
    ICON: '☕',
  },
  RESTAURANT: {
    ICON: '🍴',
  },
  BAR: {
    ICON: '🍺',
  },
  STUDY_CAFE: {
    ICON: '📚',
  },
  SPACE_RENTAL: {
    ICON: '🎉',
  },
  PC_ROOM_KARAOKE: {
    ICON: '🎮',
  },
  ACTIVITY: {
    ICON: '🤾',
    DESCRIPTION: '클라이밍,볼링,사격,당구',
  },
  ENTERTAINMENT: {
    ICON: '🍿',
    DESCRIPTION: '방탈출,만화방,보드게임카페,영화관',
  },
};

/**
 * UI에서 사용할 최종 데이터
 * 도메인 데이터와 UI 데이터를 결합
 */
export const CONDITION_CARD_TEXT = Object.entries(
  LOCATION_REQUIREMENT_BASE,
).reduce((acc, [key, value]) => {
  const uiData = LOCATION_REQUIREMENT_UI[key as LocationRequirement];
  return {
    ...acc,
    [key]: {
      ID: value.id,
      ICON: uiData.ICON,
      TEXT: value.text,
      ...(uiData.DESCRIPTION ? { DESCRIPTION: uiData.DESCRIPTION } : {}),
    },
  };
}, {}) as Record<
  LocationRequirement,
  {
    ID: LocationRequirement;
    ICON: string;
    TEXT: string;
    DESCRIPTION?: string;
  }
>;
