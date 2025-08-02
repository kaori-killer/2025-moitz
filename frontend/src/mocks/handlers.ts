import { http } from 'msw';

export const handlers = [
  http.post('https://dev.api.moitz.kr/locations', async (_req, res, ctx) => {
    return res(
      ctx.json([
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
      ]),
    );
  }),
];
