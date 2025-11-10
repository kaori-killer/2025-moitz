import { useRef, useEffect } from 'react';
import { Link } from 'react-router';

import { SelectedLocation } from '@features/recommendation/types/SelectedLocation';
import { useShareMetadata } from '@features/map/hooks/useShareMetadata';
import { useToastActionsContext } from '@features/toast/hooks/useToastActionsContext';

import MapIconButton from '@shared/components/mapIconButton/MapIconButton';
import MapPoint from '@shared/components/mapPoint/MapPoint';
import { flex } from '@shared/styles/default.styled';

import IconBack from '@icons/icon-back.svg';
import IconShare from '@icons/icon-share.svg';

import * as header from './header.styled';

const DEFAULT_CURRENT_RECOMMEND_LOCATION = '전체 추천 지점';

interface HeaderProps {
  selectedLocation: SelectedLocation;
  onLocationChange: (location: SelectedLocation) => void;
}

function Header({ selectedLocation, onLocationChange }: HeaderProps) {
  const { getShareUrl } = useShareMetadata();
  const { showToast } = useToastActionsContext();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.focus();
    }
  }, [selectedLocation]);

  const handleBackButtonClick = () => {
    onLocationChange(null);
  };

  const handleShareButtonClick = () => {
    const shareUrl = getShareUrl();
    navigator.clipboard.writeText(shareUrl);
    showToast('링크가 복사되었습니다.');
  };

  return (
    <div ref={headerRef} css={[header.base()]} tabIndex={-1}>
      <div css={[flex({ justify: 'space-between' }), header.top()]}>
        {!selectedLocation && (
          <Link aria-label="홈으로 이동" to="/">
            <MapIconButton src={IconBack} alt="뒤로 가기" />
          </Link>
        )}
        {selectedLocation && (
          <MapIconButton
            src={IconBack}
            alt="뒤로 가기"
            onClick={handleBackButtonClick}
          />
        )}
        <MapPoint
          text={
            selectedLocation
              ? selectedLocation.name
              : DEFAULT_CURRENT_RECOMMEND_LOCATION
          }
        />
        <MapIconButton
          src={IconShare}
          alt="공유하기"
          onClick={handleShareButtonClick}
        />
      </div>
    </div>
  );
}

export default Header;
