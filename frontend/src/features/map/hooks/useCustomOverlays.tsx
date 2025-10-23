/* eslint-disable no-undef */
import { useEffect, useRef } from 'react';

import {
  createCustomOverlay,
  type CustomOverlayInstance,
} from '@features/map/lib/createCustomOverlay';

import type {
  RecommendedLocation,
  StartingPlace,
} from '@entities/location/types/Location';

import MarkerIndex from '@shared/components/markerIndex/MarkerIndex';
import { numberToCharCode } from '@shared/lib/numberToCharCode';

import { getCenterFromCoords } from '../lib/getCenterFromCoords';

interface UseCustomOverlaysProps {
  startingLocations: StartingPlace[];
  recommendedLocations: RecommendedLocation[];
  selectedLocation: RecommendedLocation | null;
  changeSelectedLocation: (loc: RecommendedLocation) => void;
}

type NaverMapOptions = {
  center: naver.maps.LatLng;
  zoom: number;
  scaleControl?: boolean;
  logoControl?: boolean;
  mapDataControl?: boolean;
};

/* ===========================================
 * useCustomOverlays
 * - 추천지 선택 전: 시작점 + 모든 추천지 마커
 * - 추천지 선택 후: 시작점 + 선택된 추천지 마커 → 각 시작점으로 폴리라인
 * =========================================== */
export const useCustomOverlays = ({
  startingLocations,
  recommendedLocations,
  selectedLocation,
  changeSelectedLocation,
}: UseCustomOverlaysProps) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const naverMapRef = useRef<naver.maps.Map | null>(null);

  const overlayInstancesRef = useRef<CustomOverlayInstance[]>([]);
  const polylineInstancesRef = useRef<naver.maps.Polyline[]>([]); // 폴리라인 보관

  /* ===========================================
   * 마커 렌더링 (출발지 + 추천지)
   * =========================================== */
  useEffect(() => {
    const { naver } = window;
    if (!naver || !mapRef.current) return;

    const allLocations = [...startingLocations, ...recommendedLocations];
    if (allLocations.length === 0) return;

    // 지도 최초 1회 생성
    if (!naverMapRef.current) {
      const { centerCoord } = getCenterFromCoords(
        allLocations.map((location) => ({
          x: location.x,
          y: location.y,
        })),
      );
      const center = new naver.maps.LatLng(centerCoord.y - 0.1, centerCoord.x);

      const mapOptions: NaverMapOptions = {
        center,
        zoom: 11,
        scaleControl: false,
        logoControl: false,
        mapDataControl: false,
      };

      naverMapRef.current = new naver.maps.Map(mapRef.current, mapOptions);
    }

    // 기존 오버레이 제거
    overlayInstancesRef.current.forEach((ov) => ov.setMap(null));
    overlayInstancesRef.current = [];

    // 1) 출발지 마커 (항상 표시)
    startingLocations.forEach((loc, i) => {
      const overlay = createCustomOverlay({
        naverMap: naverMapRef.current!,
        position: new naver.maps.LatLng(loc.y, loc.x),
        zIndex: 300,
        content: (
          <div css={{ transform: 'translate(-50%, -50%)' }}>
            <MarkerIndex
              index={numberToCharCode(i + 1)}
              type="starting"
              label={loc.name}
              hasStroke
              hasShadow
            />
          </div>
        ),
      });
      overlayInstancesRef.current.push(overlay);
    });

    // 2) 추천지 마커
    // - 선택 전(null): 모두 표시
    // - 선택 후: 선택된 추천지만 표시
    recommendedLocations.forEach((loc, i) => {
      if (selectedLocation && loc.id !== selectedLocation.id) return;

      const overlay = createCustomOverlay({
        naverMap: naverMapRef.current!,
        position: new naver.maps.LatLng(loc.y, loc.x),
        zIndex: 200,
        content: (
          <button
            type="button"
            onClick={() => changeSelectedLocation(loc)}
            css={{ transform: 'translate(-50%, -50%)' }}
          >
            <MarkerIndex
              index={i + 1}
              type="recommended"
              label={loc.name}
              hasStroke
              hasShadow
            />
          </button>
        ),
      });
      overlayInstancesRef.current.push(overlay);
    });

    return () => {
      overlayInstancesRef.current.forEach((ov) => ov.setMap(null));
      overlayInstancesRef.current = [];
    };
  }, [
    startingLocations,
    recommendedLocations,
    selectedLocation,
    changeSelectedLocation,
  ]);

  /* ===========================================
   * 폴리라인 렌더링
   * - 선택된 추천지 → 각 출발지로 course 데이터를 이용한 실제 경로 그리기
   * =========================================== */
  useEffect(() => {
    const { naver } = window;
    const map = naverMapRef.current;
    if (!naver || !map) return;

    // 기존 라인 제거
    polylineInstancesRef.current.forEach((pl) => pl.setMap(null));
    polylineInstancesRef.current = [];

    if (!selectedLocation || !selectedLocation.routes) return;

    // 각 출발지별로 경로 그리기
    selectedLocation.routes.forEach((route) => {
      const startingPlace = startingLocations.find(
        (place) => place.id === route.startingPlaceId,
      );

      if (!startingPlace) return;

      // course 데이터가 있으면 course를 이용한 경로 그리기
      if (route.course && route.course.length > 0) {
        const coursePath = route.course.map(
          (point) => new naver.maps.LatLng(point.y, point.x),
        );

        const polyline = new naver.maps.Polyline({
          map,
          path: coursePath,
          strokeWeight: 4,
          strokeOpacity: 0.95,
          strokeColor: '#2563EB',
          zIndex: 1,
        });

        polylineInstancesRef.current.push(polyline);
      } else {
        // course 데이터가 없으면 직선 연결
        const selected = new naver.maps.LatLng(
          selectedLocation.y,
          selectedLocation.x,
        );
        const start = new naver.maps.LatLng(startingPlace.y, startingPlace.x);

        const path = [selected, start];

        const polyline = new naver.maps.Polyline({
          map,
          path,
          strokeWeight: 4,
          strokeOpacity: 0.95,
          strokeColor: '#2563EB',
          zIndex: 1,
        });

        polylineInstancesRef.current.push(polyline);
      }
    });

    return () => {
      polylineInstancesRef.current.forEach((pl) => pl.setMap(null));
      polylineInstancesRef.current = [];
    };
  }, [selectedLocation, startingLocations]);

  return mapRef;
};
