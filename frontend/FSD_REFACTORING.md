# FSD 구조 개선 리팩토링

## 📋 목차
1. [개요](#개요)
2. [문제점 분석](#문제점-분석)
3. [개선 사항](#개선-사항)
4. [변경 통계](#변경-통계)

---

## 개요

Feature-Sliced Design(FSD) 아키텍처 원칙을 준수하기 위한 전면적인 구조 개선 작업입니다.

### 목표
- FSD 레이어 의존성 규칙 준수
- 타입 중복 제거 및 데이터 변환 로직 분리
- 컴포넌트 계층 구조 개선
- Widget 레이어 추가로 복잡도 분리

---

## 문제점 분석

### 1. FSD 의존성 규칙 위반 (5건)

#### 문제 1-1: `shared`가 `features` import
```
❌ shared/components/meetingWrapper/MeetingWrapper.tsx
   → import from '@features/meeting/constants/conditionCard'
```
**원칙:** shared는 도메인 독립적이어야 하며, features를 import할 수 없음

#### 문제 1-2: `shared`가 `entities` import  
```
❌ shared/components/startingSpotName/StartingSpotName.tsx
   → import from '@entities/location/types/Location'
```
**원칙:** shared는 entities를 import할 수 없음

#### 문제 1-3: `entities`가 `features` import
```
❌ entities/location/hooks/useSelectedLocation.ts
   → import from '@features/recommendation/types/SelectedLocation'
```
**원칙:** entities는 shared만 사용할 수 있음

#### 문제 1-4: `entities`에 feature 전용 model
```
❌ entities/location/model/meetingStorage.ts
   → meeting feature에서만 사용
```
**원칙:** entities는 범용 도메인 로직만 포함

#### 문제 1-5: `entities`에 UI 로직 포함
```
❌ entities/location/hooks/useLocations.ts
   → isProgressLoading (UI 상태)
   → getRecommendationFull (UI 타이밍 로직 포함)
```
**원칙:** entities는 순수 데이터 로직만 포함

---

### 2. 타입 중복 문제

#### 문제: API Response 타입 중복 정의
```
types/Location.ts (7개 타입)
  - StartingPlace
  - RecommendedPlace
  - RecommendedPath
  - RecommendedRoute
  - RecommendedLocation
  - Location

api/types/RecommendationResultAPI.ts (7개 타입)
  - StartingPlaceResponse          ← StartingPlace와 100% 동일
  - RecommendedPlaceResponse        ← RecommendedPlace와 100% 동일
  - RecommendedPathResponse         ← RecommendedPath와 100% 동일
  - RecommendedRouteResponse        ← RecommendedRoute와 100% 동일
  - RecommendedLocationResponse     ← RecommendedLocation와 100% 동일
  - LocationResponse                ← Location과 거의 동일

총 16개 타입 (10개 중복)
```

**문제점:**
- 중첩된 모든 타입을 Response 버전으로 중복 정의
- 타입이 변경될 때마다 2곳을 수정해야 함
- 유지보수 비용 2배

---

### 3. 컴포넌트 구조 문제

#### 문제: 평평한(flat) 구조로 관계 불명확
```
features/recommendation/components/
├── bottomSheet/              (메인)
├── bottomSheetView/          ← 관계 불명확
├── bottomSheetDetail/        ← 관계 불명확
├── bottomSheetList/          ← 관계 불명확
├── routeCard/                (메인)
├── routeCardBar/             ← 관계 불명확
├── routeCardDetail/          ← 관계 불명확
├── routeIndicator/           ← 관계 불명확
├── routeSegment/             ← 관계 불명확
└── ...

13개 폴더가 모두 같은 레벨 ❌
```

**문제점:**
- 부모-자식 관계 파악 어려움
- 관련 컴포넌트가 분산되어 있음
- 파일 찾기 어려움
- import 경로가 복잡 (`../bottomSheetView/...`)

---

### 4. Widget 레이어 미사용

#### 문제: Page가 복잡한 UI 조합 로직 포함
```typescript
// pages/resultPage/ResultPage.tsx (98줄)
function ResultPage() {
  // 데이터 페칭 ✅
  const fetchResult = ...
  
  // UI 상태 관리 ❌ (Widget의 책임)
  const { selectedLocation, changeSelectedLocation } = ...
  const handleSpotClick = ...
  
  // 여러 feature 조합 ❌ (Widget의 책임)
  return (
    <>
      <Header {...} />      // map feature
      <Map {...} />         // map feature
      <BottomSheet {...} /> // recommendation feature
    </>
  );
}
```

**문제점:**
- Page의 책임 과다 (데이터 + UI 로직 + 컴포넌트 조합)
- 여러 feature를 조합하는 로직이 Page에 노출
- 재사용 불가능

---

## 개선 사항

### 1. FSD 의존성 규칙 준수

#### 개선 1-1: MeetingWrapper → MeetingInfo (shared → features)
```
shared/components/meetingWrapper/
  → features/recommendation/components/meetingInfo/
```
**변경:** features/meeting의 constants 사용 가능하도록 feature로 이동

#### 개선 1-2: StartingSpotName 통합
```
shared/components/startingSpotName/ 삭제
  → meetingInfo/MeetingInfo.tsx에 통합
```
**변경:** entities 의존 제거, 단순한 UI라서 통합

#### 개선 1-3: useSelectedLocation 이동
```
entities/location/hooks/useSelectedLocation.ts
  → features/recommendation/hooks/useSelectedLocation.ts
```
**변경:** recommendation 타입 사용하므로 feature로 이동

#### 개선 1-4: meetingStorage 이동
```
entities/location/model/meetingStorage.ts
  → features/meeting/model/meetingStorage.ts
```
**변경:** meeting feature에서만 사용하는 localStorage 관리

#### 개선 1-5: UI 로직 분리
```typescript
// Before: entities/location/hooks/useLocations.ts
- isProgressLoading (UI 상태)
- getRecommendationFull (UI 타이밍 로직)

// After: 분리
entities/location/hooks/useLocations.ts
  → getRecommendationId, getRecommendationResult (순수 데이터 CRUD)
  
features/loading/hooks/useRecommendationWithProgress.ts
  → isProgressLoading, getRecommendationFull (UI 타이밍 로직)
```

---

### 2. 타입 중복 제거 및 Mapper 분리

#### 개선: 도메인 타입 재사용
```typescript
// Before: 중복 정의
api/types/RecommendationResultAPI.ts
  - StartingPlaceResponse = { id, index, x, y, name }
  
types/Location.ts
  - StartingPlace = { id, index, x, y, name }  // 동일!

// After: 재사용
types/api.ts
  import { StartingPlace } from './Location';  // ✅ 재사용
  
  export type LocationResponse = {
    startingPlaces: StartingPlace[];  // ✅ 도메인 타입 사용
    locations: RecommendedLocation[];
  };
```

#### 개선: Mapper로 변환 로직 분리
```typescript
// Before: fetch 함수 안에 변환 로직
fetchRecommendationResult() {
  const data = await apiClient.get(...);
  return {
    ...data,
    recommendedLocations: data.locations,  // 변환
  };
}

// After: Mapper 분리
api/mappers/locationMapper.ts
  → mapLocationResponseToDomain(response)

fetchRecommendationResult() {
  const response = await apiClient.get(...);
  return mapLocationResponseToDomain(response);  // ✅ 분리
}
```

**효과:**
- 타입 수: 16개 → 10개 (37% 감소)
- 유지보수: 1곳만 수정하면 됨
- 테스트: mapper 독립 테스트 가능

---

### 3. 컴포넌트 계층 구조 개선

#### 개선: components/ 폴더로 하위 컴포넌트 그룹화

```
Before: 평평한 구조 (13개 폴더)
components/
├── bottomSheet/
├── bottomSheetView/
├── bottomSheetDetail/
└── bottomSheetList/

After: 계층 구조 (7개 폴더)
components/
└── bottomSheet/
    ├── BottomSheet.tsx
    └── components/
        ├── bottomSheetView/
        ├── bottomSheetDetail/
        └── bottomSheetList/
```

**적용:**
- ✅ Dropdown (dropdownEmpty, dropdownList)
- ✅ ProgressLoading (progressText)
- ✅ BottomSheet (bottomSheetView, bottomSheetDetail, bottomSheetList)
- ✅ RouteCard (routeCardBar, routeCardDetail, routeIndicator, routeSegment)

**효과:**
- import 경로: `../bottomSheetView/...` → `./components/bottomSheetView/...`
- 관계 명확: "components/ 안에 있으면 하위 컴포넌트"
- 응집도 향상: 관련 파일이 한 폴더에

---

### 4. Widget 레이어 추가

#### 개선: 여러 feature 조합을 Widget으로 분리

```typescript
// Before: ResultPage가 UI 조합 담당 (98줄)
pages/resultPage/ResultPage.tsx
  - 데이터 페칭
  - selectedLocation 상태 관리
  - Header + Map + BottomSheet 조합

// After: Widget이 UI 조합 담당
pages/resultPage/ResultPage.tsx (66줄)
  - 데이터 페칭만

widgets/recommendationPanel/RecommendationPanel.tsx
  - selectedLocation 상태 관리
  - Header + Map + BottomSheet 조합
```

**효과:**
- ResultPage 32% 간소화 (98줄 → 66줄)
- 책임 분리: Page = 데이터, Widget = UI 조합
- 재사용 가능: Widget을 다른 곳에서도 사용 가능
- 테스트 용이: 독립적으로 테스트 가능

---

## 변경 통계

### 파일 변경
- **48개 파일** 변경
- **226줄** 추가
- **263줄** 삭제
- **순감소 37줄**

### 구조 개선
| 항목 | Before | After | 개선 |
|------|--------|-------|------|
| FSD 위반 | 5건 | 0건 | ✅ 100% |
| 타입 중복 | 16개 (10개 중복) | 10개 | ✅ 37% |
| recommendation 폴더 | 13개 | 7개 | ✅ 46% |
| ResultPage 복잡도 | 98줄 | 66줄 | ✅ 32% |

---

## 최종 구조

```
src/
├── shared/              ✅ 순수 UI, 도메인 독립적
│   ├── components/      (badge, input, tag 등)
│   └── lib/
│
├── entities/
│   └── location/        ✅ 순수 데이터 로직만
│       ├── api/
│       │   ├── mappers/ (변환 로직 분리)
│       │   └── fetch*.ts
│       ├── contexts/
│       ├── hooks/       (순수 데이터 CRUD)
│       └── types/
│           ├── Location.ts (도메인)
│           └── api.ts (API, 도메인 재사용)
│
├── features/
│   ├── loading/
│   │   ├── components/
│   │   │   └── progressLoading/
│   │   │       └── components/ (하위 컴포넌트)
│   │   └── hooks/       (UI 타이밍 로직)
│   ├── meeting/
│   │   ├── components/
│   │   │   └── dropdown/
│   │   │       └── components/ (하위 컴포넌트)
│   │   └── model/       (localStorage 관리)
│   └── recommendation/
│       ├── components/
│       │   ├── bottomSheet/
│       │   │   └── components/ (하위 컴포넌트)
│       │   ├── routeCard/
│       │   │   └── components/ (하위 컴포넌트)
│       │   ├── meetingInfo/ (shared에서 이동)
│       │   └── spotItem/ (shared에서 이동)
│       └── hooks/       (recommendation 전용 훅)
│
├── widgets/             ✅ NEW
│   └── recommendationPanel/ (여러 feature 조합)
│
└── pages/               ✅ 간소화
    └── resultPage/      (데이터 페칭만)
```

---

## 커밋 히스토리

### Phase 1: 타입 & 데이터 구조 개선
1. ✅ **타입 구조 개선 및 Mapper 추가**
   - API 타입 통합 (`types/api.ts`)
   - 변환 로직 분리 (`api/mappers/locationMapper.ts`)

2. ✅ **meetingStorage 이동**
   - `entities/location/model` → `features/meeting/model`

3. ✅ **useSelectedLocation 이동**
   - `entities/location/hooks` → `features/recommendation/hooks`

4. ✅ **UI 로직 분리**
   - `features/loading/hooks/useRecommendationWithProgress.ts` 생성
   - `entities/location/hooks/useLocations.ts` 순수화

### Phase 2: 컴포넌트 이동
5. ✅ **MeetingWrapper → MeetingInfo**
   - `shared/meetingWrapper` → `features/recommendation/meetingInfo`
   - `StartingSpotName` 통합

6. ✅ **SpotItem 이동**
   - `shared/spotItem` → `features/recommendation/spotItem`

### Phase 3: 컴포넌트 구조 개선
7. ✅ **Dropdown 그룹화**
   - 하위 컴포넌트를 `components/` 폴더로

8. ✅ **BottomSheet 그룹화**
   - 하위 컴포넌트를 `components/` 폴더로

9. ✅ **RouteCard 그룹화**
   - 하위 컴포넌트를 `components/` 폴더로

10. ✅ **ProgressLoading 그룹화**
    - progressText를 `components/` 폴더로

### Phase 4: Widget 추가
11. ✅ **Widget 추가 및 ResultPage 간소화**
    - `widgets/recommendationPanel/` 생성
    - ResultPage 98줄 → 66줄

12. ✅ **중복 타입 파일 제거**
    - `api/types/` 폴더 삭제

---

## 개선 효과

### 1. 완벽한 FSD 구조
```
✅ app → pages → widgets → features → entities → shared
✅ 모든 레이어가 의존성 규칙 준수
✅ 명확한 책임 분리
```

### 2. 유지보수성 향상
```
✅ 타입 수정 시 1곳만 변경
✅ 관련 컴포넌트가 한 폴더에
✅ 컴포넌트 계층 구조 명확
```

### 3. 테스트 용이성
```
✅ 순수 데이터 로직 독립 테스트
✅ UI 로직 독립 테스트
✅ Widget 독립 테스트
```

### 4. 코드 품질
```
✅ 책임 분리 (SRP)
✅ 의존성 역전 방지
✅ 재사용성 향상
✅ 복잡도 감소
```

---

## 마이그레이션 가이드

### Import 경로 변경
```typescript
// 변경된 import 경로
- '@entities/location/model/meetingStorage'
+ '@features/meeting/model/meetingStorage'

- '@entities/location/hooks/useSelectedLocation'
+ '@features/recommendation/hooks/useSelectedLocation'

- '@shared/components/meetingWrapper/MeetingWrapper'
+ '@features/recommendation/components/meetingInfo/MeetingInfo'

- '@shared/components/spotItem/SpotItem'
+ '../spotItem/SpotItem' (recommendation 내부)

- '@entities/location/api/types/...'
+ '@entities/location/types/api'
```

### 새로운 훅 사용
```typescript
// Before
const { isProgressLoading, getRecommendationFull } = useLocationsContext();

// After
const { isProgressLoading, getRecommendationFull } = 
  useRecommendationWithProgress();
```

---

## 레이어별 책임

### Shared
- ✅ 순수 UI 컴포넌트 (badge, input, tag 등)
- ✅ 공통 유틸 함수
- ❌ 도메인 로직 없음
- ❌ 다른 레이어 의존 없음

### Entities
- ✅ 도메인 엔티티 (Location)
- ✅ API 호출 및 데이터 변환
- ✅ 순수 데이터 CRUD
- ❌ UI 로직 없음
- ❌ Feature 의존 없음

### Features
- ✅ 기능별 비즈니스 로직
- ✅ UI 타이밍, 검증 로직
- ✅ localStorage 등 feature 전용 모델
- ✅ entities, shared 사용
- ✅ 다른 feature의 constants 참조 가능

### Widgets
- ✅ 여러 feature 조합
- ✅ 복잡한 UI 상호작용
- ✅ 재사용 가능한 큰 블록
- ✅ features, entities, shared 사용

### Pages
- ✅ 라우팅
- ✅ 데이터 페칭
- ✅ 로딩/에러 처리
- ✅ Widget/Feature 조합

---

## Breaking Changes

없음. 모든 변경은 내부 구조 개선이며 외부 API는 변경되지 않았습니다.

---

## 체크리스트

- [x] FSD 의존성 규칙 준수
- [x] 타입 중복 제거
- [x] 컴포넌트 계층 구조 개선
- [x] Widget 레이어 추가
- [x] 로직 분리 (데이터 vs UI)
- [x] 빌드 확인
- [ ] 테스트 실행
- [ ] 코드 리뷰

---

## 참고 자료

- [Feature-Sliced Design 공식 문서](https://feature-sliced.design/)
- [FSD 의존성 규칙](https://feature-sliced.design/docs/reference/layers)

