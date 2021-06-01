<template>
  <v-btn icon @click="share">
    <v-icon>mdi-share-variant</v-icon>
  </v-btn>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator
          .share({
            title: "Prototype Max",
            text: "C'est vraiment une super application !",
            url: window.location.href
          })
          .then(() => console.log("Sucessfull share"))
          .catch(error => console.log("Error sharing", error));
      }
    }
  }
};
</script>
