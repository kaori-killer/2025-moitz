import { LocationRequirement } from '@entities/location/types/LocationRequirement';

export type StartingPlaceResponse = {
  id: number;
  index: number;
  x: number;
  y: number;
  name: string;
};

export type RecommendedPlaceResponse = {
  index: number;
  x: number;
  y: number;
  name: string;
  category: string;
  walkingTime: number;
  placeUrl: string;
  imageUrl: string | null;
};

export type RecommendedPathResponse = {
  index: number;
  startStation: string;
  startingX: number;
  startingY: number;
  endStation: string;
  endingX: number;
  endingY: number;
  lineCode: string;
  travelTime: number;
};

export type CoursePointResponse = {
  index: number;
  x: number;
  y: number;
};

export type RecommendedRouteResponse = {
  startingPlaceId: number;
  transferCount: number;
  totalTravelTime: number;
  paths: RecommendedPathResponse[];
  course?: CoursePointResponse[];
};

export type RecommendedLocationResponse = {
  id: number;
  index: number;
  x: number;
  y: number;
  name: string;
  avgMinutes: number;
  isBest: boolean;
  description: string;
  reason: string;
  places?: {
    [key in LocationRequirement]?: RecommendedPlaceResponse[];
  };
  routes?: RecommendedRouteResponse[];
};

export type LocationResponse = {
  requirements: LocationRequirement[];
  startingPlaces: StartingPlaceResponse[];
  locations: RecommendedLocationResponse[];
};
