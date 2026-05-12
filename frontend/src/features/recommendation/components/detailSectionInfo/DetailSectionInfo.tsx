import { SelectedLocation } from '@features/recommendation/types/SelectedLocation';

import { typography } from '@shared/styles/default.styled';

import DetailSection from '../detailSection/DetailSection';

import * as detailSectionInfo from './detailSectionInfo.styled';

interface DetailSectionInfoProps {
  selectedLocation: SelectedLocation;
}

function DetailSectionInfo({ selectedLocation }: DetailSectionInfoProps) {
  return (
    <DetailSection
      isHeader={true}
      title={selectedLocation.name}
      tag={selectedLocation.tag}
    >
      <div css={detailSectionInfo.reason()}>
        <p css={[typography.b2, detailSectionInfo.reasonText()]}>
          {selectedLocation.locationInfo}
        </p>
      </div>
    </DetailSection>
  );
}

export default DetailSectionInfo;
