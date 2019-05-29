import VuetifyLoaderPlugin from 'vuetify-loader/lib/plugin'
import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: 'PICON',
    meta: [
      { charset: 'utf-8' },
    ],
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  router: {
    middleware: [
      'auth',
      'route'
    ]
  },
  meta: {
    lang: 'ja',
    name: 'PICON',
    author: 'PICON',
    description: 'PICON',
    theme_color: '#1976d2',
    mobileAppIOS: true,
    viewport: 'width=device-width,initial-scale=1',
    ogType: 'website',
    ogSiteName: 'PICON',
    ogTitle: 'PICON',
    ogDescription: 'PICON',
    ogHost: 'https://picon-app.netlify.com',
    ogImage: {
      path: 'card.jpg'
    },
    nativeUI: true,
  },
  manifest: {
    name: 'PICON',
    short_name: 'PICON',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#1976d2',
    description: ''
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {
    'loading': '~/containers/AppLoader.vue'
  },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/firebase',
    '@/plugins/auth',
    '@/plugins/init',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
  ],

  generate: {
    fallback: true,
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
