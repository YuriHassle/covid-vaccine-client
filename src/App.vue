<template>
    <v-main>
  <v-app data-app>
        <Dashboard/>
  </v-app>
    </v-main>
</template>

<script>
import Dashboard from "./components/Dashboard";

export default {
  name: "App",

  components: {
    Dashboard,
  },

  data: () => ({

  }),
};
</script>
