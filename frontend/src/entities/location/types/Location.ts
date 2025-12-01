import { LocationRequirement } from './LocationRequirement';

export type StartingPlace = {
  id: number;
  index: number;
  x: number;
  y: number;
  name: string;
};

export type RecommendedPlace = {
  index: number;
  x: number;
  y: number;
  name: string;
  category: string;
  walkingTime: number;
  placeUrl: string;
  imageUrl: string | null;
};

export type RecommendedPath = {
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

export type CoursePoint = {
  index: number;
  x: number;
  y: number;
};

export type RecommendedRoute = {
  startingPlaceId: number;
  transferCount: number;
  totalTravelTime: number;
  paths: RecommendedPath[];
  course?: CoursePoint[];
};

export type RecommendedLocation = {
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
    [key in LocationRequirement]?: RecommendedPlace[];
  };
  routes?: RecommendedRoute[];
};

export type Location = {
  requirements: LocationRequirement[];
  startingPlaces: StartingPlace[];
  recommendedLocations: RecommendedLocation[];
};
