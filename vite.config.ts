import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // Tudo o que começar com /api será redirecionado para o json-server
      '/api': {
        target: 'https://stunning-yodel-jr57ppg5wpv5cpg56-3000.app.github.dev',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})