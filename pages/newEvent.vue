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
          <v-col cols="2">
            <v-text-field
              label="Nbr"
              type="number"
              v-model="nbr"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
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
      var newPostKey = this.$fire.database
        .ref()
        .child("events")
        .push().key;

      this.$fire.database.ref("events/").set(
        {
          [newPostKey]: this.evenement
        },
        error => {
          if (error) {
            console.log("Failed to write to database", error);
          } else {
            console.log("Event saved to database");
          }
        }
      );
    }
  },
  computed: {
    evenement() {
      return {
        host: this.$store.state.user,
        eventData: {
          titre: this.titre,
          description: this.description,
          adresse: this.adresse,
          date: this.date,
          heure: this.heure,
          requirements: this.requirements
        },
        participants: []
      };
    }
  }
};
</script>
