// export const API_BASE_URL = "/choreo-apis/sim/server-app/v1"

export const API_BASE_URL =
  import.meta.env.VITE_DEBUG === 'true'
    ? ''                          // dev → use proxy to local backend
    : import.meta.env.VITE_API_BASE;  // prod → real Choreo base