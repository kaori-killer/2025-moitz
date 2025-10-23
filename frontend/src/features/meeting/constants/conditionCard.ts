import { LocationRequirement } from '@entities/location/types/LocationRequirement';

type ConditionCardText = Record<
  LocationRequirement,
  {
    ID: LocationRequirement;
    ICON: string;
    TEXT: string;
    DESCRIPTION?: string;
  }
>;

export const CONDITION_CARD_TEXT: ConditionCardText = {
  CAFE: {
    ID: 'CAFE',
    ICON: '☕️',
    TEXT: '카페',
  },
  RESTAURANT: {
    ID: 'RESTAURANT',
    ICON: '🍴',
    TEXT: '식당',
  },
  BAR: {
    ID: 'BAR',
    ICON: '🍺',
    TEXT: '술집',
  },
  STUDY_CAFE: {
    ID: 'STUDY_CAFE',
    ICON: '📚',
    TEXT: '스터디카페',
  },
  SPACE_RENTAL: {
    ID: 'SPACE_RENTAL',
    ICON: '🎉',
    TEXT: '파티룸',
  },
  PC_ROOM_KARAOKE: {
    ID: 'PC_ROOM_KARAOKE',
    ICON: '🎮',
    TEXT: 'PC방/노래방',
  },
  ACTIVITY: {
    ID: 'ACTIVITY',
    ICON: '🤾',
    TEXT: '액티비티',
    DESCRIPTION: '클라이밍,볼링,사격,당구',
  },
  ENTERTAINMENT: {
    ID: 'ENTERTAINMENT',
    ICON: '🍿',
    TEXT: '엔터테인먼트',
    DESCRIPTION: '방탈출,만화방,보드게임카페,영화관',
  },
};
