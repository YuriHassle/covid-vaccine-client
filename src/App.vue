<template>
  <v-app>
    <Header />
    <v-main>
      <transition mode="out-in">
        <router-view />
      </transition>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    },
    created() {
      if (localStorage.getItem('token')) {
        this.$store.dispatch('getUser');
      } else if (
        !localStorage.getItem('token') &&
        this.$router.history.current.name !== 'login'
      ) {
        this.$router.push({ name: 'login' });
      }
    },
  };
</script>
