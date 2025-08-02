import useLocations from '../../entities/useLocations';

const requestBody = {
  startingPlaceNames: ['강변역', '동대문역', '서울대입구역'],
  meetingTime: '14:00',
  requirement: '노래방은 있었으면 좋겠어요!',
};

function IndexPage() {
  const { data: locations, loading, error } = useLocations(requestBody);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p>에러 발생!</p>;
  if (!locations || locations.length === 0) return <p>추천 결과가 없습니다.</p>;

  return (
    <div>
      {locations.map((location) => (
        <p key={location.index}>{location.name}</p>
      ))}
    </div>
  );
}

export default IndexPage;
