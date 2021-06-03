<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card-title>
        <v-text-field
          label="Titre de l'événement"
          v-model="titre"
        ></v-text-field>
      </v-card-title>

      <v-card-text>
        <v-card-title>Détails pratiques</v-card-title>
        <v-textarea
          outlined
          name="input-7-4"
          label="Description"
          value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          hide-details
          v-model="description"
        ></v-textarea>
        <v-text-field
          prepend-icon="mdi-map-marker"
          label="Adresse"
          v-model="adresse"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-calendar"
          label="Date"
          v-model="date"
        ></v-text-field>
        <v-text-field
          prepend-icon="mdi-clock"
          label="Heure"
          v-model="heure"
        ></v-text-field>
      </v-card-text>

      <v-card-title>Répartition</v-card-title>
      <v-card-text>
        <v-row align="center" justify="space-between">
          <v-col cols="3">
            <v-text-field
              label="Nbr"
              type="number"
              v-model="nbr"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-text-field label="Amener..." v-model="amener"></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn fab width="40" height="40" @click="append">
              <v-icon>
                mdi-plus
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row
          v-for="(amener, index) in requirements"
          v-bind:key="index"
          justify="space-between"
          align="center"
        >
          <v-col cols="auto">
            {{ amener.amener }}
          </v-col>
          <v-col cols="auto">
            <v-row align="center">
              <v-col cols="auto"> x{{ amener.nbr }} </v-col>
              <v-col cols="auto">
                <v-btn icon>
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-btn color="blue" @click="writeDatabase">
        Store event
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    titre: "Grosse soirée",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean pharetra felis quis libero ultrices",
    adresse: "2 route du fun",
    date: "29 Mai 1195",
    heure: "23h33",
    amener: "Coca",
    nbr: 1000,
    requirements: []
  }),
  methods: {
    append() {
      let amener = this.amener;
      let nbr = this.nbr;
      console.log(amener, nbr, this.requirements);
      this.requirements.push({ amener, nbr });
    },
    writeDatabase() {
      this.$fire.messaging.onMessage(payload => {
        console.log("Message received. ", payload);
        // ...
      });
      this.$fire.messaging
        .getToken({
          vapidKey:
            "BDDiQyADw5eJi3NvuONa3LBWcpNfBmBn3fQXNsVTLLDy-C0gP1A8zPYBEwqz4m2St5t7768S_qpWQaKxnsd5578"
        })
        .then(currentToken => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            console.log(currentToken);
          } else {
            // Show permission request UI
            console.log(
              "No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch(err => {
          console.log("An error occurred while retrieving token. ", err);
          // ...
        });
      // var newPostKey = this.$fire.database
      //   .ref()
      //   .child("posts")
      //   .push().key;

      // this.$fire.database.ref("events/" + newPostKey).set({
      //   eventData: this.evenement
      // });
    }
  },
  computed: {
    evenement() {
      return {
        owner: this.$store.state.user,
        titre: this.titre,
        description: this.description,
        adresse: this.adresse,
        date: this.date,
        heure: this.heure,
        requirements: this.requirements
      };
    }
  }
};
</script>
