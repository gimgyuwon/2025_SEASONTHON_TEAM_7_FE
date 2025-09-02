import axios from 'axios';
import type { AxiosRequestHeaders } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080', // 기본 URL 설정
  headers: {
    'Content-Type': 'application/json',
  },
});

// 매 요청마다 최신 토큰을 동적으로 설정하고,
// 로그인/소셜로그인/회원가입/토큰발급 등 인증 엔드포인트에는 Authorization 헤더를 제거합니다.
api.interceptors.request.use((config) => {
  const accessToken = (() => {
    try {
      return sessionStorage.getItem('accessToken');
    } catch {
      return null;
    }
  })();

  const url = config.url || '';
  const isAuthEndpoint =
    url.includes('/login');// ||
    // url.includes('/'); // 추후 인증 엔드포인트 추가 시 수정 (온보딩 등)

  if (!config.headers) config.headers = {} as AxiosRequestHeaders;

  if (accessToken && !isAuthEndpoint) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

// 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log('401 에러: 인증이 필요합니다.');
      
      // 토큰 제거, 추후 리프레시 api 추가 시 수정 예정
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      
      // 특정 페이지들은 리다이렉트하지 않도록 설정
      const currentPath = window.location.pathname;
      const noRedirectPaths = ['/login', '/signup']; // 추후 수정 예정
      if (!noRedirectPaths.includes(currentPath)) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
