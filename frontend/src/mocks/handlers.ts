import dotenv from 'dotenv';
import { http, HttpResponse } from 'msw';

dotenv.config();

export const handlers = [
  // eslint-disable-next-line no-empty-pattern
  http.post(`https://dev.api.moitz.kr/locations`, ({}) => {
    return HttpResponse.json([
      {
        id: 1,
        index: 1,
        x: 127.0,
        y: 37.5,
        name: '왕십리역',
        avgMinutes: 18,
        isBest: true,
        description: '엔터플렉스에 노래방',
        reason: '중간 위치',
        places: [],
        routes: [],
      },
    ]);
  }),
];
