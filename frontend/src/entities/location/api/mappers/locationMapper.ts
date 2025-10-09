import { LocationResponse } from '@entities/location/types/api';
import { Location } from '@entities/location/types/Location';

/**
 * 백엔드 API 응답을 프론트엔드 도메인 모델로 변환
 * 
 * @param response - 백엔드 API 응답 (locations 필드)
 * @returns 프론트엔드 도메인 모델 (recommendedLocations 필드)
 */
export function mapLocationResponseToDomain(response: LocationResponse): Location {
  return {
    requirement: response.requirement,
    startingPlaces: response.startingPlaces,
    recommendedLocations: response.locations,
  };
}

