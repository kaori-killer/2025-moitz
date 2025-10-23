import { LocationRequirement } from '@entities/location/types/LocationRequirement';

export type RecommendationRequestBody = {
  startingPlaceNames: string[];
  requirements: LocationRequirement[];
};

export type RecommendationResponse = {
  id: string;
};
