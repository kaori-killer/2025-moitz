import { LocationResponse } from '@entities/location/api/types/RecommendationResultAPI';
import {
  RecommendedLocation,
  StartingPlace,
} from '@entities/location/types/Location';

export const StartingPlacesMock: StartingPlace[] = [
  { id: 1, x: 126.9784, y: 37.5665, index: 0, name: '서울역' },
  { id: 2, x: 127.0276, y: 37.4979, index: 1, name: '강남역' },
  { id: 3, x: 127.0364, y: 37.5006, index: 2, name: '역삼역' },
];

export const RecommendedLocationsMock: RecommendedLocation[] = [
  {
    id: 1,
    index: 1,
    name: '서울역',
    tagInfo: '서울의 중심역, 교통의 허브',
    avgMinutes: 35,
    isBest: true,
    x: 126.9723,
    y: 37.5563,
    locationInfo: '모든 노선이 모이는 교통의 요지',
    tag: 'FAIRNESS',
  },
  {
    id: 2,
    index: 2,
    name: '강남역',
    tagInfo: '유동인구 많은 번화가',
    avgMinutes: 40,
    isBest: false,
    x: 127.0286,
    y: 37.4979,
    locationInfo: '회사, 음식점, 모임장소가 많음',
    tag: 'EFFICIENCY',
  },
  {
    id: 3,
    index: 3,
    name: '잠실역',
    tagInfo: '롯데월드와 석촌호수 인근',
    avgMinutes: 25,
    isBest: false,
    x: 127.1002,
    y: 37.5133,
    locationInfo: '야경이 예쁘고 주변 시설이 풍부함',
    tag: 'MAX_BURDEN_RELIEF',
  },
  {
    id: 4,
    index: 4,
    name: '홍대입구역',
    tagInfo: '젊음의 거리와 예술의 거리',
    avgMinutes: 20,
    isBest: false,
    x: 126.9239,
    y: 37.5572,
    locationInfo: '공연과 문화 공간이 많아 흥미로움',
    tag: 'TRANSFER',
  },
  {
    id: 5,
    index: 5,
    name: '신촌역',
    tagInfo: '대학교 인근, 맛집 거리',
    avgMinutes: 30,
    isBest: false,
    x: 126.9368,
    y: 37.5551,
    locationInfo: '젊고 활기찬 분위기, 모임 장소로 적절',
    tag: 'GENERAL',
  },
];

export const LocationsMock: LocationResponse = {
  requirements: ['CAFE', 'STUDY_CAFE'],
  startingPlaces: [
    {
      id: 1,
      index: 1,
      x: 126.952,
      y: 37.481,
      name: '잠실역',
    },
  ],
  locations: [
    {
      id: 1,
      index: 1,
      y: 37.49808633653005,
      x: 127.02800140627488,
      name: '강남역',
      avgMinutes: 21,
      isBest: true,
      tagInfo: '역세권, 편의시설 풍부! 👍😋',
      locationInfo:
        '유명한 곱창집이 있고, 전체적으로 환승을 하지 않는 최적의 지역입니다!',
      tag: 'FAIRNESS',
      places: {
        STUDY_CAFE: [
          {
            index: 1,
            x: 127.001235033865,
            y: 37.5057797334071,
            name: '헤이든스터디룸',
            category: '스터디카페,스터디룸',
            walkingTime: 6,
            placeUrl: 'http://place.map.kakao.com/171181631',
            imageUrl:
              'https://blog.kakaocdn.net/dn/biQeJU/btr1bl4BgvA/oXnUvaPsxYeZ0sgkKKdQk1/img.jpg',
          },
          {
            index: 2,
            x: 127.00104050902335,
            y: 37.50608968106879,
            name: '얼리버드스터디카페 반포2점',
            category: '스터디카페,스터디룸',
            walkingTime: 6,
            placeUrl: 'http://place.map.kakao.com/1221092727',
            imageUrl:
              'https://postfiles.pstatic.net/MjAyNDEyMDVfMTcx/MDAxNzMzMzg1OTMzMDY0.2MdI7PR13b-eGbW0nyFYa-usYFjs7S1iUP74zlosaeEg._hYxaI3SnYH2KZUq6E-9WVsoC5rdGYBL8SB5I4J66UMg.JPEG/d7dbd01fb62fd0262b96be9208d4eca8_thumb.jpg?type=w580',
          },
          {
            index: 3,
            x: 127.00156640623871,
            y: 37.50550402186723,
            name: '얼리버드스터디카페 반포점',
            category: '스터디카페,스터디룸',
            walkingTime: 5,
            placeUrl: 'http://place.map.kakao.com/802970241',
            imageUrl:
              'https://postfiles.pstatic.net/MjAyMjA0MDRfNzcg/MDAxNjQ5MDAxNjg3MDEw.Y6rHHDNW-bkQdcfRhQ6E2RWY8yT0CVJJQlz5dUFFqAUg.pvrNjnyCS5NV8cLfWxtPvEJVbnwY04jKX_l2MuqNvdAg.JPEG.earlybirdstudy/IMG_2422.JPG?type=w966',
          },
        ],
        SPACE_RENTAL: [
          {
            index: 1,
            x: 127.001639997153,
            y: 37.5090359605167,
            name: '공간세빛',
            category: '공간대여',
            walkingTime: 9,
            placeUrl: 'http://place.map.kakao.com/377732190',
            imageUrl: null,
          },
        ],
      },
      routes: [
        {
          startingPlaceId: 1,
          transferCount: 0,
          totalTravelTime: 15,
          paths: [
            {
              index: 1,
              startStation: '강변역',
              startingX: 126.9815,
              startingY: 37.4765,
              endStation: '잠실역',
              endingX: 126.9815,
              endingY: 37.4765,
              lineCode: '2호선',
              travelTime: 20,
            },
          ],
        },
      ],
    },
  ],
};
