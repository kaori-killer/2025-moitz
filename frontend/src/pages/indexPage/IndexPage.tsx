import FallBackPage from '@pages/fallBackPage/FallBackPage';

import ProgressLoading from '@features/loading/components/progressLoading/ProgressLoading';
import MeetingForm from '@features/meeting/components/meetingForm/MeetingForm';

import { useLocationsContext } from '@entities/location/contexts/useLocationsContext';

import HeaderLogo from '@shared/components/headerLogo/HeaderLogo';
import { flex, grid_padding, scroll } from '@shared/styles/default.styled';

import * as indexPage from './indexPage.styled';

function IndexPage() {
  const { data, isProgressLoading, isError, errorMessage } =
    useLocationsContext();

  if (isError)
    return (
      <FallBackPage
        reset={() => {
          window.location.reload();
        }}
        error={new Error(errorMessage)}
        text="홈으로 돌아가기"
      />
    );

  if (isProgressLoading) {
    return (
      <ProgressLoading
        isReadyToComplete={
          isProgressLoading && data?.recommendedLocations?.length > 0
        }
      />
    );
  }

  return (
    <main
      css={[
        flex({ direction: 'column' }),
        grid_padding,
        scroll,
        indexPage.base(),
      ]}
    >
      <header css={indexPage.headerLogo()}>
        <HeaderLogo />
      </header>
      <MeetingForm />
      <footer css={indexPage.footer()}>
        © 2025 Moitz. All rights reserved.
      </footer>
    </main>
  );
}

export default IndexPage;
