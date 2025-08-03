import { renderHook, waitFor } from '@testing-library/react';

import useLocations from './useLocations';

test('정상적으로 추천 장소를 받아온다', async () => {
  const requestBody = {
    startingPlaceNames: ['강변역', '신촌역'],
    meetingTime: '14:00',
    requirement: '노래방',
  };

  const { result } = renderHook(() => useLocations(requestBody));

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
    expect(result.current.data.length).toBeGreaterThan(0);
  });
});
