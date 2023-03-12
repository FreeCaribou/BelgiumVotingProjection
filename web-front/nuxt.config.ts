import { HookResult } from 'nuxt/schema';
import vuetify from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Belgium Voting Projection'
    }
  },
  css: ['vuetify/styles'], // vuetify ships precompiled css, no need to import sass
  vite: {
      // curently this will lead to a type error, but hopefully will be fixed soon #justBetaThings
      ssr: {
          noExternal: ['vuetify'], // add the vuetify vite plugin
      },
  },
  modules: [
      // @ts-ignore
      async (options, nuxt) => {
          nuxt.hooks.hook('vite:extendConfig', config => config?.plugins?.push(
              vuetify()
          ) as unknown as HookResult)
      }
  ],
  components: true,
});
