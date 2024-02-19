// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  postcss: {
    plugins: {
      "postcss-simple-vars": {},
    },
  },
  modules: ["@nuxtjs/tailwindcss"],
})
