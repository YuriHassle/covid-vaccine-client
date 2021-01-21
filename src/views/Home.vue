<template>
  <section>
    <Login v-if="loggedIn === 'false'" @login="login" />
    <Dashboard v-else />
  </section>
</template>

<script>
import Login from "../components/Login";
import Dashboard from "../components/Dashboard";
export default {
  name: "Home",
  components: {
    Login,
    Dashboard,
  },
  /*   computed: {
    loggedIn() {
      return localStorage.getItem("loggedIn");
    },
  }, */
  data() {
    return {
      loggedIn: localStorage.getItem("loggedIn"),
    };
  },
  methods: {
    login(isLogged) {
      this.loggedIn = isLogged;
    },
  },
};
</script>

<style></style>
