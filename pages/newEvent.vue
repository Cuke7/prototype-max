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
        <AddElement @addElement="addElement"></AddElement>

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
                <v-btn icon @click="removeElement(amener)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" @click="writeDatabase">
          Let's go
        </v-btn>
      </v-card-actions>
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
    requirements: []
  }),
  methods: {
    addElement(data) {
      console.log(data);
      this.requirements.push(data);
    },
    removeElement(data) {
      let suppr = confirm("Supprimer " + data.amener + " x" + data.nbr + " ?");
      if (suppr) {
        this.requirements.splice(this.requirements.indexOf(data));
      }
    },
    writeDatabase() {
      var newPostKey = this.$fire.database
        .ref()
        .child("events")
        .push().key;

      this.$fire.database.ref("events/" + newPostKey).set(
        {
          data: this.evenement
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
