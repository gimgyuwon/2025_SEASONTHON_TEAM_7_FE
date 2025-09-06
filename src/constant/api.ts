export const API_ENDPOINTS = {
  SIGNUP: 'http://34.47.125.208:8080/api/auth/signup',
  ALL_MEMBER: 'http://34.47.125.208:8080/api/members/all-list',
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
