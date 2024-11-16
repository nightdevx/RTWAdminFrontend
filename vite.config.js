import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    "/uploads": {
      target: "http://tkk04oksokwwgwswgg84cg4w.5.253.143.162.sslip.io",
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
    },
  },
});
