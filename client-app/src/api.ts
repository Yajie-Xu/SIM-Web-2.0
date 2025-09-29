// src/api.ts (optional central place for API URL)
// export const API_URL = import.meta.env.API_BASE_URL || "http://localhost:8000";
// export const API_BASE =
//   import.meta.env.VITE_DEBUG === 'true'
//     ? ''                                   // dev: Vite proxy to local FastAPI
//     : import.meta.env.BASE_URL|| "http://localhost:8000";       // prod: full Choreo base

// src/api.ts
export const API_URL =
  import.meta.env.VITE_DEBUG === 'true'
    ? '' // Dev → call relative path; Vite proxy forwards to local FastAPI
    : import.meta.env.VITE_API_BASE || 'http://localhost:8000'; // Prod → Choreo or fallback