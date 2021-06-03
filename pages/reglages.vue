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
    <v-snackbar v-model="snackbar" timeout="-1">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    snackbar: false,
    text: "",
    settings: {
      notifications: false,
      darkMode: false
    }
  }),
  watch: {
    settings: {
      handler: function(settings) {
        if (settings.notifications == true) {
          this.$OneSignal.push(() => {
            this.$OneSignal.isPushNotificationsEnabled(isEnabled => {
              if (isEnabled) {
                console.log("Push notifications are enabled!");
                this.$OneSignal.getUserId(userId => {
                  // Make a POST call to your server with the user ID
                  // Mixpanel Example
                  // mixpanel.people.set({ $onesignal_user_id: userId });
                  console.log("OneSignal player ID : ", userId);
                  this.text = "OneSignal player ID : " + userId;
                  this.snackbar = true;
                });
              } else {
                console.log("Push notifications are not enabled yet.");
              }
            });
          });
        }

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
