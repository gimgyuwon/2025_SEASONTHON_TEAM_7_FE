export const API_ENDPOINTS = {
  SIGNUP: 'http://34.47.125.208:8080/api/auth/signup',
} as const;

export type ApiEndpoint = typeof API_ENDPOINTS[keyof typeof API_ENDPOINTS];
