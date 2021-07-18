<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Prototype</v-toolbar-title>
      <v-spacer />
      <Profil :user="user"></Profil>

      <v-btn icon @click="login" v-if="!user">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn icon @click="logout" v-else>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <Share></Share>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-snackbar v-model="snackbar" timeout="5000">
      {{ text }}
    </v-snackbar>

    <v-footer app>
      <span>ElectroEasy &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import AddButton from "../components/AddButton.vue";
export default {
  components: { AddButton },
  data() {
    return {
      snackbar: false,
      text: "",
      timeout: 2000,
      drawer: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Accueil",
          to: "/"
        },
        {
          icon: "mdi-cog",
          title: "Réglages",
          to: "/reglages"
        }
      ],
      hostedEvents: []
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    login() {
      var provider = new this.$fireModule.auth.GoogleAuthProvider();
      this.$fireModule
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = credential.accessToken;
          // The signed-in user info.
          var user = result.user;
          // ...
          this.text = "Logged in 🎉";
          this.snackbar = true;
        })
        .catch(error => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    logout() {
      this.$fireModule
        .auth()
        .signOut()
        .then(() => {
          this.text = "Logged out ❌";
          this.snackbar = true;
        })
        .catch(error => {
          // An error happened.
        });
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      if (localStorage.settings) {
        let settings = JSON.parse(localStorage.settings);
        //console.log(settings);
        this.$vuetify.theme.dark = settings.darkMode;
      }
    });
  }
};
</script>
