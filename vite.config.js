import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['skintight-aids-attire.ngrok-free.dev'],
    proxy: {
      '/api/chat': {
        target: 'https://api.minimax.chat',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chat/, '/v1/text/chatcompletion_v2'),
        configure: (proxy, options) => {
          proxy.on('proxyReq', (proxyReq, req, res) => {
            proxyReq.setHeader('Authorization', 'Bearer sk-cp-FNNPuDlXvE0RV7QD50WBeh7T_CVkWPG2BaujL64oemMyFVFWvrWh2Lc0z9vs368ujBWWiQYtOUdp4RPe_IFKw651XsV0yfgMbDR8oELd9vXXcZjDiT-omzQ');
            proxyReq.setHeader('Content-Type', 'application/json');
          });
        }
      }
    }
  }
})
