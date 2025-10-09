import { StartingPlace, RecommendedLocation } from './Location';
import { LocationRequirement } from './LocationRequirement';

// ========== 요청 타입 ==========
export type RecommendationRequestBody = {
  startingPlaceNames: string[];
  requirement: LocationRequirement;
};

// ========== 응답 타입 ==========
export type RecommendationIdResponse = {
  id: string;
};

/**
 * 백엔드 API 응답 타입
 * 백엔드는 'locations' 필드명 사용
 * 프론트엔드는 'recommendedLocations'로 변환하여 사용
 */
export type LocationResponse = {
  requirement: LocationRequirement;
  startingPlaces: StartingPlace[];
  locations: RecommendedLocation[];
};
