import { useLocationsContext } from '@entities/location/contexts/useLocationsContext';

export const useShareMetadata = () => {
  const { data: location } = useLocationsContext();

  const getShareUrl = () => {
    const startingPlaces = location?.startingPlaces || [];
    const startingPlacesCount = startingPlaces.length;
    const firstPlace = startingPlaces[0]?.name || '';

    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set('count', startingPlacesCount.toString());

    if (firstPlace) {
      shareUrl.searchParams.set('place', firstPlace);
    }

    return shareUrl.toString();
  };

  return { getShareUrl };
};
