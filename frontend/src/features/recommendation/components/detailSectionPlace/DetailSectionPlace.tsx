import { useState } from 'react';

import { usePagination } from '@features/recommendation/hooks/usePagenation';
import { SelectedLocation } from '@features/recommendation/types/SelectedLocation';

import { LocationRequirement } from '@entities/location/types/LocationRequirement';
import { getLocationRequirementText } from '@entities/location/utils/getLocationRequirementText';

import { flex, typography } from '@shared/styles/default.styled';

import IconArrowLeftGray3 from '@icons/icon-arrow-left-gray-3.svg';
import IconArrowLeftGray6 from '@icons/icon-arrow-left-gray-6.svg';
import IconArrowRightGray3 from '@icons/icon-arrow-right-gray-3.svg';
import IconArrowRightGray6 from '@icons/icon-arrow-right-gray-6.svg';

import DetailSection from '../detailSection/DetailSection';
import PlaceCard from '../placeCard/PlaceCard';
import PlaceTag from '../placeTag/PlaceTag';

import * as detailSectionPlace from './detailSectionPlace.styled';

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
  const ITEMS_PER_PAGE = 2;

  const { currentPage, totalPages, goToPrevPage, goToNextPage } = usePagination(
    {
      totalItems: placesInCategory.length,
      itemsPerPage: ITEMS_PER_PAGE,
      initialPage: 1,
      key: selectedCategory,
    },
  );

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePlaces = placesInCategory.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  const handleCategoryClick = (category: LocationRequirement) => {
    setSelectedCategory(category);
  };

  return (
    <DetailSection
      isHeader={false}
      title={'주변 추천 장소'}
      isBestBadge={false}
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

      <div
        css={[
          flex({ justify: 'space-between' }),
          detailSectionPlace.placeList(),
        ]}
      >
        {visiblePlaces.map((place) => (
          <PlaceCard key={place.index} place={place} />
        ))}
      </div>

      <div css={[flex({ justify: 'center', align: 'center', gap: 20 })]}>
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          css={[detailSectionPlace.paginationButton()]}
        >
          <img
            src={currentPage === 1 ? IconArrowLeftGray6 : IconArrowLeftGray3}
            alt="이전 페이지"
          />
        </button>
        <div css={[flex({ justify: 'center', align: 'center', gap: 5 })]}>
          <span css={[typography.sh1, detailSectionPlace.paginationCur()]}>
            {String(currentPage).padStart(2, '0')}
          </span>
          <span css={[typography.sh1, detailSectionPlace.paginationTotal()]}>
            {`/`}
          </span>
          <span css={[typography.sh1, detailSectionPlace.paginationTotal()]}>
            {String(totalPages).padStart(2, '0')}
          </span>
        </div>
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          css={[detailSectionPlace.paginationButton()]}
        >
          <img
            src={
              currentPage === totalPages
                ? IconArrowRightGray6
                : IconArrowRightGray3
            }
            alt="다음 페이지"
          />
        </button>
      </div>
    </DetailSection>
  );
}

export default DetailSectionPlace;
