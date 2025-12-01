import { SelectedLocation } from '@features/recommendation/types/SelectedLocation';

import { StartingPlace } from '@entities/location/types/Location';

import { numberToCharCode } from '@shared/lib/numberToCharCode';
import { flex } from '@shared/styles/default.styled';

import DetailSection from '../detailSection/DetailSection';
import RouteCard from '../routeCard/RouteCard';

interface DetailSectionRouteProps {
  startingPlaces: StartingPlace[];
  selectedLocation: SelectedLocation;
}

function DetailSectionRoute({
  startingPlaces,
  selectedLocation,
}: DetailSectionRouteProps) {
  return (
    <DetailSection
      isHeader={false}
      title={'각 출발지로부터 이동 방법'}
      isBestBadge={false}
    >
      <div css={flex({ direction: 'column', gap: 20 })}>
        {selectedLocation.routes.map((route) => (
          <RouteCard
            key={route.startingPlaceId}
            startingPlaceIndex={numberToCharCode(route.startingPlaceId)}
            startingPlaceName={
              startingPlaces.find((place) => place.id === route.startingPlaceId)
                ?.name || ''
            }
            route={route}
          />
        ))}
      </div>
    </DetailSection>
  );
}

export default DetailSectionRoute;
