import { defineConfig } from '@vue/cli-service'
export default defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        headers: {
          Accept: "application/json",
          "content-type": "application/json"
        },
        // pathRewrite: { '^/api': '' } // Optionnel si tu veux modifier l'URL avant qu'elle ne soit envoyée au backend
      }
    }
  }
})
