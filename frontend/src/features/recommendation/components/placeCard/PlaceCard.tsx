import { RecommendedPlace } from '@entities/location/types/Location';

import { flex, typography } from '@shared/styles/default.styled';

import ImagePlaceDefault from '@image/image-place-default.svg';

import * as card from './placeCard.styled';

interface PlaceCardProps {
  place: RecommendedPlace;
}

function PlaceCard({ place }: PlaceCardProps) {
  const imageUrl = place.imageUrl ? place.imageUrl : ImagePlaceDefault;

  const handleClick = () => {
    window.open(place.placeUrl, '_blank');
  };

  return (
    <button
      type="button"
      css={[flex({ direction: 'column', gap: 10 }), card.base()]}
      onClick={handleClick}
      aria-label={`${place.name} 장소 정보 더보기`}
    >
      <img
        css={card.image()}
        src={imageUrl}
        alt={place.name + ' 장소 이미지'}
        crossOrigin="anonymous"
        onError={(e) => {
          e.currentTarget.src = ImagePlaceDefault;
        }}
      />
      <div css={[flex({ direction: 'column', gap: 5 }), card.content()]}>
        <span css={[typography.sh1, card.name()]}>{place.name}</span>
        <span css={[typography.c2, card.walkingTime()]}>
          걸어서 {place.walkingTime}분
        </span>
      </div>
    </button>
  );
}

export default PlaceCard;
