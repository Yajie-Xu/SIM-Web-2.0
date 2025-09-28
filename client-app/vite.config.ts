// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//    server: {
//     proxy: {
//       '/process': 'http://127.0.0.1:8000',
//       '/health': 'http://127.0.0.1:8000',
//       '/models': 'http://127.0.0.1:8000',
//     },
//   },
// })

// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const DEBUG = env.VITE_DEBUG === 'true'

  return {
    plugins: [react()],
    server: DEBUG
      ? {
          // Dev-only proxy to your local FastAPI (or wherever it's running)
          proxy: {
            // We namespace API calls under /api to avoid clashes with static files
            '/api': {
              target: 'http://127.0.0.1:8000', // FastAPI dev server
              changeOrigin: true,
              secure: false,
              // strip the /api prefix before hitting FastAPI
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          },
        }
      : undefined,
    // Optional: if you serve the app from a subpath in production, set base here:
    // base: env.VITE_BASE_PATH || '/',
  }
})