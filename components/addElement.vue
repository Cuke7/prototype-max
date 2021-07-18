<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2" dark v-bind="attrs" v-on="on">
          Ajouter un élement
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Amener un truc
        </v-card-title>

        <v-card-text class="my-8">
          <v-text-field
            label="Combien ?"
            type="number"
            v-model="nbr"
            hide-details=""
            class="mb-6"
          ></v-text-field>
          <v-text-field
            label="Quoi ?"
            v-model="amener"
            hide-details=""
          ></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="addElement">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      nbr: 1,
      amener: "coca"
    };
  },
  methods: {
    addElement() {
      this.$emit("addElement", { nbr: this.nbr, amener: this.amener });
      this.dialog = false;
    }
  }
};
</script>
