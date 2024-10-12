<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <!-- Routed components will be rendered here -->
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer, // Register the Footer component here
  },
};
</script>

<style>
/* Global styles if needed */
</style>
