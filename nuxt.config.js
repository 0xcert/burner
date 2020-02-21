require('dotenv').config()

export default {
  mode: 'spa',
  head: {
    htmlAttrs: { lang: 'en' },
    title: '0xcert Burner',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap'
      }
    ]
  },
  loading: { color: '#0971FF' },
  styleResources: {
    scss: ['./assets/_mixins.scss']
  },
  css: ['~/assets/_forms'],
  plugins: [{ src: '~/plugins/vee-validate' }, { src: '~/plugins/common' }],
  scrollToTop: true,
  pageTransition: 'fade',
  buildModules: [
    '@nuxtjs/dotenv',
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    [
      '@nuxtjs/google-analytics',
      {
        id: 'UA-156579164-1'
      }
    ]
  ],
  eslint: {
    quiet: true,
    fix: true
  },
  stylelint: {
    quiet: true,
    fix: true
  },
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources', '@nuxtjs/toast'],
  toast: {
    position: 'bottom-right',
    duration: 3000
  },
  axios: { baseURL: process.env.BASE_API_URL },
  build: {
    extend(config, ctx) {
      config.node = { fs: 'empty' }
    }
  }
}
