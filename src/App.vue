<template>
  <v-main>
    <v-app data-app>
      <Home />
    </v-app>
  </v-main>
</template>

<script>
import Home from "./views/Home";

export default {
  name: "App",

  components: {
    Home,
  },

  data: () => ({}),
};
</script>
