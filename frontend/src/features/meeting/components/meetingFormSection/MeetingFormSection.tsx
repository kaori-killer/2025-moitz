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
    <section css={flex({ direction: 'column', gap: 10 })}>
      <div css={[flex({ direction: 'column', gap: 8 }), section.header()]}>
        <div css={[flex({ gap: 2 })]}>
          <span css={[typography.sh1, section.icon()]} aria-hidden="true">
            {iconText}
          </span>
          <h2 css={[typography.h2, section.title()]}>{titleText}</h2>
        </div>
        <span css={[typography.b2, section.description()]}>
          {descriptionText}
        </span>
      </div>
      {children}
    </section>
  );
}

export default MeetingFormSection;
