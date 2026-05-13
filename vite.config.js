import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['skintight-aids-attire.ngrok-free.dev'],
    proxy: {
      '/api/chat': {
        target: 'https://api.deepseek.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/chat/completions'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Authorization', 'Bearer sk-c63c623298324265a895dd8cd5f05f22');
            proxyReq.setHeader('Content-Type', 'application/json');
          });
        }
      }
    }
  }
})
