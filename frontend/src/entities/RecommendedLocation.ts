export interface Place {
  index: number;
  name: string;
  category: string;
  walkingTime: number;
  url: string;
}

export interface Path {
  index: number;
  startStation: string;
  endStation: string;
  lineCode: string;
  travelTime: number;
}

export interface Route {
  startPlace: string;
  startingX: string;
  startingY: string;
  transferCount: string;
  totalTravelTime: number;
  paths: Path[];
}

export interface RecommendedLocation {
  id: number;
  index: number;
  y: number;
  x: number;
  name: string;
  avgMinutes: number;
  isBest: boolean;
  description: string;
  reason: string;
  places: Place[];
  routes: Route[];
}
