import React from 'react';

import { flex, typography } from '@shared/styles/default.styled';

import * as section from './meetingFormSection.styled';

interface MeetingFormSectionProps {
  iconText: string;
  titleText: string;
  descriptionText: string;
  children: React.ReactNode;
}

function MeetingFormSection({
  iconText,
  titleText,
  descriptionText,
  children,
}: MeetingFormSectionProps) {
  return (
    <div css={flex({ direction: 'column', gap: 10 })}>
      <div css={[flex({ direction: 'column', gap: 8 }), section.header()]}>
        <div css={[flex({ gap: 2 })]}>
          <span css={[typography.sh1, section.icon()]}>{iconText}</span>
          <span css={[typography.h2, section.title()]}>{titleText}</span>
        </div>
        <span css={[typography.b2, section.description()]}>
          {descriptionText}
        </span>
      </div>
      {children}
    </div>
  );
}

export default MeetingFormSection;
