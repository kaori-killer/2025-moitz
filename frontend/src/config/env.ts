/**
 * 환경별 API Base URL을 반환하는 유틸리티 함수
 */
export const getApiBaseUrl = (): string => {
  const apiBaseUrl =
    process.env.NODE_ENV === 'production'
      ? process.env.PROD_API_BASE_URL
      : process.env.DEV_API_BASE_URL;

  if (!apiBaseUrl) {
    const envType = process.env.NODE_ENV === 'production' ? 'PROD' : 'DEV';
    console.error(
      `❌ ${envType}_API_BASE_URL 환경 변수가 설정되지 않았습니다. NODE_ENV: ${process.env.NODE_ENV}`,
    );
    throw new Error(
      `${envType}_API_BASE_URL 환경 변수가 설정되지 않았습니다. 빌드 시점에 환경 변수를 확인해주세요.`,
    );
  }

  return apiBaseUrl;
};

/**
 * 환경 설정 관련 상수들
 */
export const ENV_CONFIG = {
  API_BASE_URL: getApiBaseUrl(),
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
} as const;
