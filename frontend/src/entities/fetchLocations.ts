interface LocationRequestBody {
  startingPlaceNames: string[];
  meetingTime: string;
  requirement: string;
}

const fetchLocations = async (requestBody: LocationRequestBody) => {
  const response = await fetch('https://dev.api.moitz.kr/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    throw new Error('이동 경로를 찾을 수 없습니다.');
  }

  return response.json();
};

export default fetchLocations;
