import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    server: {
      host: '0.0.0.0',
      port: 5173,
      //allowedHosts: ['workspace'],
      //hmr: {
      //  host: 'admin.blog.test',
     // }
  },
  plugins: [react(),
    tailwindcss(),],
})
