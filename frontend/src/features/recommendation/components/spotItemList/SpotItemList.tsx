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
        const { index, name, description, avgMinutes, isBest } = location;
        return (
          <li
            role="listitem"
            aria-label={`${index + 1}번째 추천 장소는 ${name} 입니다`}
            key={index}
          >
            <SpotItem
              index={index}
              name={name}
              description={description}
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
