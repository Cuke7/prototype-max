<template>
  <v-fab-transition>
    <v-btn
      nuxt
      to="newEvent"
      v-show="!hidden"
      color="blue"
      absolute
      bottom
      right
      fab
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-fab-transition>
</template>

<script>
export default {
  props: ["user"],

  data() {
    return {
      hidden: false
    };
  }
};
</script>
