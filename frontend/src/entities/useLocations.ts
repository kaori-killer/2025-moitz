import { useEffect, useState } from 'react';

import fetchLocations from '../entities/fetchLocations';

import { RecommendedLocation } from './RecommendedLocation';

interface LocationRequestBody {
  startingPlaceNames: string[];
  meetingTime: string;
  requirement: string;
}

const useLocations = (
  requestBody: LocationRequestBody,
): {
  data: RecommendedLocation[];
  loading: boolean;
  error: boolean;
} => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const locations = await fetchLocations(requestBody);
        setData(locations);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useLocations;
