<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-list three-line subheader>
        <v-subheader>General</v-subheader>
        <v-list-item>
          <v-list-item-action>
            <v-checkbox v-model="settings.notifications"></v-checkbox>
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
            <v-switch v-model="settings.darkMode"></v-switch>
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
    settings: {
      notifications: false,
      darkMode: true
    }
  }),
  watch: {
    settings: {
      handler: function(settings) {
        localStorage.settings = JSON.stringify(settings);
        this.$vuetify.theme.dark = settings.darkMode;
      },
      deep: true
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      if (localStorage.settings) {
        this.settings = JSON.parse(localStorage.settings);
      }
    });
  }
};
</script>
