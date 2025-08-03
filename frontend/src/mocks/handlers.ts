import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('https://dev.api.moitz.kr/locations', async () => {
    return HttpResponse.json([
      {
        id: 1,
        index: 1,
        x: 127.0,
        y: 37.5,
        name: '왕십리역',
        avgMinutes: 18,
        isBest: true,
        description: '중간 위치',
        reason: '교통 편리',
        places: [],
        routes: [],
      },
    ]);
  }),
];
