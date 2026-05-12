import { useState } from 'react';

import { SelectedLocation } from '@features/recommendation/types/SelectedLocation';

import { LocationRequirement } from '@entities/location/types/LocationRequirement';
import { getLocationRequirementText } from '@entities/location/utils/getLocationRequirementText';

import { flex } from '@shared/styles/default.styled';

import DetailSection from '../detailSection/DetailSection';
import PlaceCardList from '../placeCardList/PlaceCardList';
import PlaceTag from '../placeTag/PlaceTag';

interface DetailSectionPlaceProps {
  selectedLocation: SelectedLocation;
}

function DetailSectionPlace({ selectedLocation }: DetailSectionPlaceProps) {
  const categories = Object.keys(selectedLocation.places).filter(
    (category) => selectedLocation.places[category].length > 0,
  ) as LocationRequirement[];

  const [selectedCategory, setSelectedCategory] = useState<LocationRequirement>(
    categories[0],
  );

  const placesInCategory = selectedLocation.places[selectedCategory];

  const handleCategoryClick = (category: LocationRequirement) => {
    setSelectedCategory(category);
  };

  return (
    <DetailSection
      isHeader={false}
      title={'주변 추천 장소'}
    >
      <div css={[flex({ gap: 5 })]}>
        {categories.map((category) => (
          <PlaceTag
            key={category}
            text={getLocationRequirementText(category)}
            selected={category === selectedCategory}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>

      <PlaceCardList category={selectedCategory} places={placesInCategory} />
    </DetailSection>
  );
}

export default DetailSectionPlace;
