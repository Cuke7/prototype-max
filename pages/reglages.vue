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
            <v-list-item-title>Notifications 🔔</v-list-item-title>
            <v-list-item-subtitle
              >En plus je crois que Nuxt offre une intégration avec
              OneSignal.</v-list-item-subtitle
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
            <v-list-item-title>Mode nuit 🌙</v-list-item-title>
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
    snackbar: false,
    text: "",
    notifications: false,
    darkMode: false
  }),
  computed: {
    settings() {
      let settings = {
        notifications: this.notifications,
        darkMode: this.darkMode
      };
      return settings;
    }
  },
  watch: {
    darkMode(val) {
      this.$vuetify.theme.dark = val;
      localStorage.settings = JSON.stringify(this.settings);
    },
    notifications() {
      localStorage.settings = JSON.stringify(this.settings);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      let settingsStored = localStorage.settings;
      if (settingsStored) {
        let settings = JSON.parse(settingsStored);
        for (const [key, value] of Object.entries(settings)) {
          this[key] = value;
        }
      }
    });
  }
};
</script>
