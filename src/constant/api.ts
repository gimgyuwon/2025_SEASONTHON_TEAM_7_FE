export const API_ENDPOINTS = {
  SIGNUP: "https://tee-talk.com/api/v1/auth/signup",
  ALL_MEMBER: "https://tee-talk.com/api/v1/members",
} as const;

export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
