import { CONDITION_CARD_TEXT } from '@features/meeting/constants/conditionCard';

import { StartingPlace } from '@entities/location/types/Location';
import { LocationRequirement } from '@entities/location/types/LocationRequirement';

import Dot from '@shared/components/dot/Dot';
import { flex, typography } from '@shared/styles/default.styled';

import * as meetingInfo from './meetingInfo.styled';

interface MeetingInfoProps {
  startingPlaces: StartingPlace[];
  conditionID: LocationRequirement;
}

const getCustomConditionIdText = (id: LocationRequirement) => {
  const entry = CONDITION_CARD_TEXT[id];
  return entry.ID === 'NOT_SELECTED' ? entry.TEXT : `${entry.TEXT} 장소`;
};

function MeetingInfo({ startingPlaces, conditionID }: MeetingInfoProps) {
  const conditionIdText = getCustomConditionIdText(conditionID);

  return (
    <div css={[meetingInfo.base(), flex({ direction: 'column', gap: 10 })]}>
      <div css={[flex({ align: 'center', gap: 10 })]}>
        <span css={[typography.sh1, meetingInfo.title()]}>출발지</span>
        <div css={[flex({ wrap: 'wrap', gap: 5 })]}>
          {startingPlaces.map((place, index) => {
            const isLast = startingPlaces.length - 1 === index;
            return (
              <div
                key={place.index}
                css={flex({ justify: 'center', align: 'center', gap: 5 })}
              >
                <span css={[typography.b2, meetingInfo.nameList()]}>
                  {place.name}
                </span>
                {!isLast && <Dot size={3} colorType="main" colorTokenIndex={1} />}
              </div>
            );
          })}
        </div>
      </div>
      <div css={[flex({ align: 'center', gap: 10 })]}>
        <span css={[typography.sh1, meetingInfo.title()]}>조건</span>
        <span css={[typography.b2, meetingInfo.content()]}>
          {conditionIdText}
        </span>
      </div>
    </div>
  );
}

export default MeetingInfo;

