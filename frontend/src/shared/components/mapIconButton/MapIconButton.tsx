import { flex, shadow } from '@shared/styles/default.styled';

import * as mapButton from './mapIconButton.styled';

interface MapIconButtonProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

function MapIconButton({ src, alt, onClick }: MapIconButtonProps) {
  return (
    <button
      css={[
        flex({ justify: 'center', align: 'center' }),
        shadow.map,
        mapButton.base(),
      ]}
      onClick={onClick}
    >
      <img src={src} alt={alt} />
    </button>
  );
}

export default MapIconButton;
