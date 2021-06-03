<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <AddButton></AddButton>
      <v-btn color="blue" @click="writeDatabase">
        test
      </v-btn>
      {{ token }}
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    token: ""
  }),
  methods: {
    writeDatabase() {
      this.$fire.messaging
        .getToken({
          vapidKey:
            "BDDiQyADw5eJi3NvuONa3LBWcpNfBmBn3fQXNsVTLLDy-C0gP1A8zPYBEwqz4m2St5t7768S_qpWQaKxnsd5578"
        })
        .then(currentToken => {
          if (currentToken) {
            // Send the token to your server and update the UI if necessary
            // ...
            this.token = currentToken;
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
    }
  }
};
</script>
