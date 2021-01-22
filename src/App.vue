<template>
  <div id="app">
    <Header />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    components: {
      Header,
      Footer
    },
    created() {
      if (!localStorage.getItem('token')) {
        this.$router.push('/login');
      }
    }
  };
</script>
