export const API_ENDPOINTS = {
  SIGNUP: "https://34.47.125.208/api/v1/auth/signup",
  ALL_MEMBER: "https://34.47.125.208/api/v1/members",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
