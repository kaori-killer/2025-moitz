/* eslint-disable no-undef */
import { useEffect, useRef } from 'react';

import type {
  RecommendedLocation,
  StartingPlace,
} from '@entities/types/Location';

import MarkerIndex from '@shared/components/markerIndex/MarkerIndex';
import { numberToCharCode } from '@shared/utils/numberToCharCode';

import CustomOverlay from '../lib/CustomOverlay';
import { getCenterFromCoords } from '../lib/getCenterFromCoords';

interface UseCustomOverlaysProps {
  startingLocations: StartingPlace[];
  recommendedLocations: RecommendedLocation[];
  selectedLocation: RecommendedLocation | null;
  changeSelectedLocation: (loc: RecommendedLocation) => void;
}

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

  const overlayInstancesRef = useRef<CustomOverlay[]>([]);
  const polylineInstancesRef = useRef<naver.maps.Polyline[]>([]); // 폴리라인 보관

  /* ===========================================
   * 마커 렌더링 (출발지 + 추천지)
   * =========================================== */
  useEffect(() => {
    const { naver } = window;
    if (!naver || !mapRef.current) return;

    const allLocations = [...startingLocations, ...recommendedLocations];
    if (allLocations.length === 0) return;

    const { centerCoord } = getCenterFromCoords(
      allLocations.map((location) => ({
        x: location.x,
        y: location.y,
      })),
    );
    const center = new naver.maps.LatLng(centerCoord.y - 0.1, centerCoord.x);

    // 지도 최초 1회 생성
    if (!naverMapRef.current) {
      naverMapRef.current = new naver.maps.Map(mapRef.current, {
        center,
        zoom: 11,
      });
    }
    const map = naverMapRef.current!;

    // 기존 오버레이 제거
    overlayInstancesRef.current.forEach((ov) => ov.setMap(null));
    overlayInstancesRef.current = [];

    // 1) 출발지 마커 (항상 표시)
    startingLocations.forEach((loc, i) => {
      const overlay = new CustomOverlay({
        naverMap: map,
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
    recommendedLocations.forEach((loc, i) => {
      if (selectedLocation && loc.id !== selectedLocation.id) return;

      const overlay = new CustomOverlay({
        naverMap: map,
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
   * =========================================== */
  useEffect(() => {
    const { naver } = window;
    const map = naverMapRef.current;
    if (!naver || !map) return;

    polylineInstancesRef.current.forEach((pl) => pl.setMap(null));
    polylineInstancesRef.current = [];

    if (!selectedLocation) return;

    const selected = new naver.maps.LatLng(
      selectedLocation.y,
      selectedLocation.x,
    );

    startingLocations.forEach((start) => {
      if (start.x === selectedLocation.x && start.y === selectedLocation.y)
        return;

      const path = [selected, new naver.maps.LatLng(start.y, start.x)];

      const polyline = new naver.maps.Polyline({
        map,
        path,
        strokeWeight: 4,
        strokeOpacity: 0.95,
        strokeColor: '#2563EB',
        zIndex: 1,
      });

      polylineInstancesRef.current.push(polyline);
    });

    return () => {
      polylineInstancesRef.current.forEach((pl) => pl.setMap(null));
      polylineInstancesRef.current = [];
    };
  }, [selectedLocation, startingLocations]);

  return mapRef;
};
