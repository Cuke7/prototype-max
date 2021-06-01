<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="notifications"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notifications</v-list-item-title>
            <v-list-item-subtitle
              >En plus je crois que Nuxt offre une intégration avec Onesignal.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="sound"></v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sound</v-list-item-title>
            <v-list-item-subtitle
              >Ça sert à rien de cliquer, ça fait
              rien.</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list subheader>
        <v-subheader>Apparence</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-switch v-model="darkMode"></v-switch>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mode nuit</v-list-item-title>
            <v-list-item-subtitle
              >Change les couleurs (incroyable hein ?)</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    notifications: false,
    sound: true,
    widgets: false
  }),
  computed: {
    darkMode: {
      get() {
        return this.$store.state.darkMode;
      },
      set(val) {
        this.$vuetify.theme.dark = val;
        this.$store.commit("updateDarkMode", val);
      }
    }
  },
  watch: {
    darkMode(val) {}
  },
  mounted() {
    this.$vuetify.theme.dark = this.$store.state.darkMode;
  }
};
</script>
