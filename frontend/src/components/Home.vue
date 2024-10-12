<template>
  <div>
    <main>
      <Hero />
    </main>
  </div>
</template>

<script>
import Hero from "./Hero.vue";

export default {
  name: "App",
  components: {
    Hero, // Register the Hero component
  },
};
</script>

<style>
/* Global styles if needed */
</style>
