import { useState } from 'react';

import Header from '@features/map/components/header/Header';
import Map from '@features/map/components/map/Map';
import BottomSheet from '@features/recommendation/components/bottomSheet/BottomSheet';

import {
  RecommendedLocation,
  StartingPlace,
} from '@entities/location/types/Location';
import { LocationRequirement } from '@entities/location/types/LocationRequirement';

import { flex } from '@shared/styles/default.styled';

import * as styled from './recommendationPanel.styled';

interface RecommendationPanelProps {
  startingPlaces: StartingPlace[];
  recommendedLocations: RecommendedLocation[];
  requirement: LocationRequirement;
}

function RecommendationPanel({
  startingPlaces,
  recommendedLocations,
  requirement,
}: RecommendationPanelProps) {
  const [selectedLocation, setSelectedLocation] = useState<RecommendedLocation | null>(null);

  const handleSpotClick = (location: RecommendedLocation) => {
    setSelectedLocation(location);
  };

  return (
    <div css={styled.container()}>
      <Header
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
      />
      <div css={[flex({ direction: 'column', justify: 'flex-end' }), styled.content()]}>
        <Map
          startingLocations={startingPlaces}
          recommendedLocations={recommendedLocations}
          selectedLocation={selectedLocation}
          changeSelectedLocation={setSelectedLocation}
        />
        <BottomSheet
          startingLocations={startingPlaces}
          recommendedLocations={recommendedLocations}
          conditionID={requirement}
          selectedLocation={selectedLocation}
          handleSpotClick={handleSpotClick}
        />
      </div>
    </div>
  );
}

export default RecommendationPanel;

