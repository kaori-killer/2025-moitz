import { Link } from 'react-router';

import { SelectedLocation } from '@features/recommendation/types/SelectedLocation';
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
  const { showToast } = useToastActionsContext();
  const handleBackButtonClick = () => {
    onLocationChange(null);
  };

  const handleShareButtonClick = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('링크가 복사되었습니다.');
  };

  return (
    <div css={[header.base()]}>
      <div css={[flex({ justify: 'space-between' }), header.top()]}>
        {!selectedLocation && (
          <Link to="/">
            <MapIconButton src={IconBack} alt="back" />
          </Link>
        )}
        {selectedLocation && (
          <MapIconButton
            src={IconBack}
            alt="back"
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
          alt="share"
          onClick={handleShareButtonClick}
        />
      </div>
    </div>
  );
}

export default Header;
