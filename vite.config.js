//vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'  

// https://vite.dev/config/
export default defineConfig({
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api/, "/api"), // opcional pero seguro
        },
      },
      //allowedHosts: ['workspace'],
      //hmr: {
      //  host: 'admin.blog.test',
     // }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@app':       path.resolve(__dirname, 'src/components/app'),
      '@form':       path.resolve(__dirname, 'src/components/form'),
      '@html':       path.resolve(__dirname, 'src/components/html'),
      '@icons':      path.resolve(__dirname, 'src/components/icons'),
      '@route':      path.resolve(__dirname, 'src/routes/appRoutes'),
      '@pages':      path.resolve(__dirname, 'src/pages'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),],
})
