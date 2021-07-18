<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      Mes événements
      <v-card
        v-for="(event, index) in hostedEvents"
        v-bind:key="index"
        class="my-8 pa-2"
      >
        <v-row align="center" justify="space-between">
          <v-col cols="auto" class="text-body-1">
            {{ event.event.data.eventData.titre }}
          </v-col>
          <v-col cols="auto">
            <v-btn icon @click="share(event)">
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
      Événement auquels je participe
      <AddButton></AddButton>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    hostedEvents: []
  }),
  methods: {
    share(event) {
      if (navigator.share) {
        navigator
          .share({
            title: "Invitation à " + event.event.data.eventData.titre,
            text: "Cliquez pour rejoindre 🎉",
            url: window.location.href + event.key
          })
          .then(() => console.log(this.subtitle))
          .catch(error => console.log("Error sharing", error));
      }
    }
  },
  mounted() {
    this.$fire.database
      .ref()
      .child("events")
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          let events = snapshot.val();
          console.log(events);
          if (this.$store.state.user) {
            for (let [key, value] of Object.entries(events)) {
              //console.log(`${key}: ${value}`);
              if (events[key].data.host.uid == this.$store.state.user.uid) {
                this.hostedEvents.push({ event: events[key], key: key });
              }
            }
          }
          console.log(this.hostedEvents);
        } else {
          console.log("No data available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
};
</script>
