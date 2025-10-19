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
    description: '서울의 중심역, 교통의 허브',
    avgMinutes: 35,
    isBest: true,
    x: 126.9723,
    y: 37.5563,
    reason: '모든 노선이 모이는 교통의 요지',
  },
  {
    id: 2,
    index: 2,
    name: '강남역',
    description: '유동인구 많은 번화가',
    avgMinutes: 40,
    isBest: false,
    x: 127.0286,
    y: 37.4979,
    reason: '회사, 음식점, 모임장소가 많음',
  },
  {
    id: 3,
    index: 3,
    name: '잠실역',
    description: '롯데월드와 석촌호수 인근',
    avgMinutes: 25,
    isBest: false,
    x: 127.1002,
    y: 37.5133,
    reason: '야경이 예쁘고 주변 시설이 풍부함',
  },
  {
    id: 4,
    index: 4,
    name: '홍대입구역',
    description: '젊음의 거리와 예술의 거리',
    avgMinutes: 20,
    isBest: false,
    x: 126.9239,
    y: 37.5572,
    reason: '공연과 문화 공간이 많아 흥미로움',
  },
  {
    id: 5,
    index: 5,
    name: '신촌역',
    description: '대학교 인근, 맛집 거리',
    avgMinutes: 30,
    isBest: false,
    x: 126.9368,
    y: 37.5551,
    reason: '젊고 활기찬 분위기, 모임 장소로 적절',
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
      description: '역세권, 편의시설 풍부! 👍😋',
      reason:
        '유명한 곱창집이 있고, 전체적으로 환승을 하지 않는 최적의 지역입니다!',
      places: [
        {
          index: 1,
          name: '매머드커피 루터회관점',
          category: '카페',
          walkingTime: 1,
          url: 'http://place.map.kakao.com/35026031',
        },
      ],
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
