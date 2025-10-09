import { shadow } from '@shared/styles/default.styled';

import DropdownEmpty from './components/dropdownEmpty/DropdownEmpty';
import DropdownList from './components/dropdownList/DropdownList';
import * as dropdown from './dropdown.styled';

interface DropdownProps {
  stations: string[];
  handleStationSelect: (station: string) => void;
}

function Dropdown({ stations, handleStationSelect }: DropdownProps) {
  return (
    <ul css={[dropdown.base(), shadow.dropdown]}>
      {!stations.length ? (
        <DropdownEmpty />
      ) : (
        <DropdownList
          stations={stations}
          handleStationSelect={handleStationSelect}
        />
      )}
    </ul>
  );
}

export default Dropdown;
