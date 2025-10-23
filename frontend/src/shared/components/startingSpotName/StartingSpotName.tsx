import { StartingPlace } from '@entities/location/types/Location';

import { typography } from '@shared/styles/default.styled';

import SeparatedText from '../separatedText/SeparatedText';

import * as startingSpotNameStyled from './startingSpotName.styled';

interface StartSpotNameProps {
  place: StartingPlace;
  isLast: boolean;
}

function StartingSpotName({ place, isLast }: StartSpotNameProps) {
  return (
    <SeparatedText key={place.index} isLast={isLast}>
      <span css={[typography.b2, startingSpotNameStyled.nameList()]}>
        {place.name}
      </span>
    </SeparatedText>
  );
}

export default StartingSpotName;
