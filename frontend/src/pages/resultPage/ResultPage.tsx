import { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

import FallBackPage from '@pages/fallBackPage/FallBackPage';

import BaseLoading from '@features/loading/components/baseLoading/BaseLoading';

import RecommendationPanel from '@widgets/recommendationPanel/RecommendationPanel';

import { useLocationsContext } from '@entities/location/contexts/useLocationsContext';

import * as resultPage from './resultPage.styled';

function ResultPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: location,
    isLoading,
    getRecommendationResult,
  } = useLocationsContext();

  const fetchResult = useCallback(async () => {
    try {
      await getRecommendationResult(id);
    } catch {
      navigate('/');
    }
  }, [id, getRecommendationResult, navigate]);

  useEffect(() => {
    if (!id) {
      navigate('/');
      return;
    }
    if (!location || location.recommendedLocations.length === 0) {
      fetchResult();
    }
  }, [id, location, fetchResult, navigate]);

  if (isLoading) {
    return <BaseLoading />;
  }

  if (!location || location.recommendedLocations.length === 0)
    return (
      <FallBackPage
        reset={() => navigate('/')}
        error={new Error('추천 결과가 없습니다.')}
        text="홈으로 돌아가기"
      />
    );

  return (
    <div css={resultPage.container()}>
      <RecommendationPanel
        startingPlaces={location.startingPlaces}
        recommendedLocations={location.recommendedLocations}
        requirement={location.requirement}
      />
    </div>
  );
}

export default ResultPage;
