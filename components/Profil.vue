<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar size="30" class="mx-5" v-bind="attrs" v-on="on">
        <img v-bind:src="user.photoURL" alt="John" v-if="user" />
      </v-avatar>
    </template>

    <v-card>
      <v-card-title>
        Profil du compte
      </v-card-title>
      <v-row justify="center" class="my-6">
        <v-col cols="5">
          <v-avatar size="auto">
            <img v-bind:src="user.photoURL" alt="John" v-if="user" />
          </v-avatar>
        </v-col>
      </v-row>

      <v-card-text v-if="user">
        <v-row>
          {{ user.displayName }}
        </v-row>
        <v-row>
          {{ user.email }}
        </v-row>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="dialog = false">
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["user"],

  data() {
    return {
      dialog: false
    };
  }
};
</script>
