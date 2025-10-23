import { usePagination } from '@features/recommendation/hooks/usePagination';

import { RecommendedPlace } from '@entities/location/types/Location';
import { LocationRequirement } from '@entities/location/types/LocationRequirement';

import { flex, typography } from '@shared/styles/default.styled';

import IconArrowLeftGray3 from '@icons/icon-arrow-left-gray-3.svg';
import IconArrowLeftGray6 from '@icons/icon-arrow-left-gray-6.svg';
import IconArrowRightGray3 from '@icons/icon-arrow-right-gray-3.svg';
import IconArrowRightGray6 from '@icons/icon-arrow-right-gray-6.svg';

import PlaceCard from '../placeCard/PlaceCard';

import * as placeCardList from './placeCardList.styled';

interface PlaceCardListProps {
  category: LocationRequirement;
  places: RecommendedPlace[];
}

function PlaceCardList({ category, places }: PlaceCardListProps) {
  const ITEMS_PER_PAGE = 2;

  const { currentPage, totalPages, goToPrevPage, goToNextPage } = usePagination(
    {
      totalItems: places.length,
      itemsPerPage: ITEMS_PER_PAGE,
      initialPage: 1,
      key: category,
    },
  );

  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const visiblePlaces = places.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  return (
    <>
      <div
        css={[flex({ justify: 'space-between' }), placeCardList.placeList()]}
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
          css={[placeCardList.paginationButton()]}
        >
          <img
            src={currentPage === 1 ? IconArrowLeftGray6 : IconArrowLeftGray3}
            alt="이전 페이지"
          />
        </button>
        <div css={[flex({ justify: 'center', align: 'center', gap: 5 })]}>
          <span css={[typography.sh1, placeCardList.paginationCur()]}>
            {String(currentPage).padStart(2, '0')}
          </span>
          <span css={[typography.sh1, placeCardList.paginationTotal()]}>
            {`/`}
          </span>
          <span css={[typography.sh1, placeCardList.paginationTotal()]}>
            {String(totalPages).padStart(2, '0')}
          </span>
        </div>
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          css={[placeCardList.paginationButton()]}
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
    </>
  );
}

export default PlaceCardList;
