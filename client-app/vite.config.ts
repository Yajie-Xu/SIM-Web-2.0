import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  console.log('VITE_DEBUG =', env.VITE_DEBUG)
  const DEBUG = env.VITE_DEBUG === 'true'

  return {
    plugins: [react()],
    server: DEBUG ? {
      proxy: {
        '/process': { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/health' : { target: 'http://127.0.0.1:8000', changeOrigin: true },
        '/models' : { target: 'http://127.0.0.1:8000', changeOrigin: true },
      },
    } : undefined,
  }
})

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

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '')

//   // Optional debug log at build/dev start (Node context)
//   console.log('VITE_DEBUG =', env.VITE_DEBUG)

//   return {
//     plugins: [react()],
//     server: {
//       ...(env.VITE_DEBUG === 'true' && {
//         proxy: {
//           // Dev-only proxy to your local FastAPI without /api prefix
//           '/process': { target: 'http://127.0.0.1:8000', changeOrigin: true },
//           '/health':  { target: 'http://127.0.0.1:8000', changeOrigin: true },
//           '/models':  { target: 'http://127.0.0.1:8000', changeOrigin: true },
//           // If you prefer to keep an /api prefix end-to-end instead, delete the three
//           // lines above and use the block below (make sure your FastAPI route matches):
//           // '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true },
//           // Or, if your server route is `/process` and you want to call `/api/process` in the client:
//           // '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true, rewrite: p => p.replace(/^\/api/, '') },
//         },
//       }),
//     },
//   }
// })