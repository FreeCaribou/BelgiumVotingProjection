// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Belgium Voting Projection'
    }
  },
  modules: ["@vuestic/nuxt"],
  css: ['vuestic-ui/dist/styles/index.css'],
});
