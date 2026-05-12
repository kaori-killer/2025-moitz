import React from 'react';

import TagBadge, { TagBadgeType } from '@shared/components/tagBadge/TagBadge';
import { flex, typography } from '@shared/styles/default.styled';

import * as detailSection from './detailSection.styled';

interface DetailSectionProps {
  isHeader: boolean;
  title: string;
  tag?: TagBadgeType;
  children: React.ReactNode;
}

function DetailSection({
  isHeader,
  title,
  tag,
  children,
}: DetailSectionProps) {
  return (
    <div css={flex({ direction: 'column', gap: 10 })}>
      <div css={flex({ justify: 'space-between', align: 'center' })}>
        <span
          css={[
            isHeader ? typography.h1 : typography.h3,
            detailSection.title(),
          ]}
        >
          {title}
        </span>
        {tag && <TagBadge type={tag} />}
      </div>
      {children}
    </div>
  );
}

export default DetailSection;
