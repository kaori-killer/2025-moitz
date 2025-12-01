import { flex, typography } from '@shared/styles/default.styled';

import IconLogo from '@icons/logo-icon.svg';

import * as voteHeader from './voteHeader.styled';

interface VoteHeaderProps {
  title: string;
  description: string;
  subDescription: string;
}

function VoteHeader({ title, description, subDescription }: VoteHeaderProps) {
  return (
    <header css={flex({ direction: 'column', align: 'center', gap: 10 })}>
      <div css={flex({ align: 'center', gap: 10 })}>
        <img src={IconLogo} alt="" css={voteHeader.icon()} aria-hidden="true" />
        <h1 css={[typography.h1, voteHeader.title()]}>{title}</h1>
      </div>
      <div css={flex({ direction: 'column', align: 'center', gap: 5 })}>
        <p css={[typography.b2, voteHeader.description()]}>{description}</p>
        <p css={[typography.c1, voteHeader.subDescription()]}>
          {subDescription}
        </p>
      </div>
    </header>
  );
}

export default VoteHeader;
