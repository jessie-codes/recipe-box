export default defineNuxtConfig({
  app: {
    baseURL: '/recipe-box/'
  },
  modules: ['@nuxt/content'],
  content: {
    renderer: {
      anchorLinks: false
    }
  },
  css: ['~/assets/css/main.css'],
  compatibilityDate: '2025-11-01'
})
