import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - prototype-party-planner",
    title: "prototype-party-planner",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/onesignal",
    "@nuxtjs/pwa",
    "@nuxtjs/firebase"
  ],

  oneSignal: {
    init: {
      appId: '749c8162-608c-4937-bb4f-0747f4e845a2',
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
          disable: true
      }
    }
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "Proto Max",
      lang: "fr",
      short_name: "Proto Max",
      display: "fullscreen"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  firebase: {
    config: {
      // REQUIRED: Official config for firebase.initializeApp(config):
      apiKey: "AIzaSyDe4fVbWMs_p84JzF6BeLDfqRGmvSfQavI",
      authDomain: "prototype-party-planner.firebaseapp.com",
      projectId: "prototype-party-planner",
      storageBucket: "prototype-party-planner.appspot.com",
      messagingSenderId: "803603139154",
      appId: "1:803603139154:web:886589fc2d9b5acb0a2d8b",
      databaseURL:
        "https://prototype-party-planner-default-rtdb.europe-west1.firebasedatabase.app"
    },
    services: {
      database: true,
      auth: {
        persistence: "local", // default
        initialize: {
          onAuthStateChangedMutation: "ON_AUTH_STATE_CHANGED_MUTATION",
          onAuthStateChangedAction: "onAuthStateChangedAction",
          subscribeManually: false
        }
      },
      database: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {}
};
