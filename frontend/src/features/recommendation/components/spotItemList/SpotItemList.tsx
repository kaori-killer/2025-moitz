import { RecommendedLocation } from '@entities/location/types/Location';

import SpotItem from '@shared/components/spotItem/SpotItem';
import { flex } from '@shared/styles/default.styled';

interface SpotItemListProps {
  recommendedLocations: RecommendedLocation[];
  onSpotClick: (spot: RecommendedLocation) => void;
}

function SpotItemList({
  recommendedLocations,
  onSpotClick,
}: SpotItemListProps) {
  return (
    <ul role="list" css={[flex({ direction: 'column', gap: 20 })]}>
      {recommendedLocations.map((location) => {
        const { id, name, tagInfo, tag, avgMinutes, isBest } = location;
        return (
          <li key={id} role="listitem">
            <SpotItem
              name={name}
              tagInfo={tagInfo}
              tag={tag}
              avgMinutes={avgMinutes}
              isBest={isBest}
              onClick={() => onSpotClick(location)}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default SpotItemList;
