import { flex, typography } from '@shared/styles/default.styled';

import * as placeTag from './placeTag.styled';

interface PlaceTagProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

function PlaceTag({ text, selected, onClick }: PlaceTagProps) {
  return (
    <button
      css={[
        flex({ justify: 'center', align: 'center' }),
        placeTag.base(selected),
      ]}
      type="button"
      onClick={onClick}
    >
      <span css={[typography.sh2, placeTag.text(selected)]}>{text}</span>
    </button>
  );
}
export default PlaceTag;
