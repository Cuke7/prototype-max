<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div v-if="event">
        <v-row>
          <v-col cols="auto">
            <v-card-title>{{ event.data.eventData.titre }}</v-card-title>
          </v-col>
        </v-row>
        <v-card-text>
          {{ event.data.eventData.heure }}
        </v-card-text>
        <v-row>
          <v-card-text>
            {{ event.data.eventData.description }}
          </v-card-text>
        </v-row>
      </div>
      <v-skeleton-loader
        v-else
        type="card-avatar, article, actions"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    event: null
  }),

  async asyncData({ params }) {
    const eventID = params.eventID; // When calling /abc the slug will be "abc"
    return { eventID };
  },

  mounted() {
    console.log(this.event);
    this.$fire.database
      .ref()
      .child("events")
      .child(this.eventID)
      .get()
      .then(snapshot => {
        if (snapshot.exists()) {
          this.event = snapshot.val();
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
