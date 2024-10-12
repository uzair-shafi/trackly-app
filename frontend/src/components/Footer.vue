<template>
  <footer class="bg-black text-[#BCBCBC] text-sm py-10 text-center">
    <div class="container mx-auto">
      <div
        class="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-[linear-gradient(to_right,#F87BFF,#FB92CF,#FFDD9B,#C2F0B1,#2FD8FE)] before:absolute"
      >
        <img :src="logoSrc" alt="SaaS logo" class="relative h-10" />
      </div>
      <nav class="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
        <a href="#" class="hover:text-white">About</a>
        <a href="#" class="hover:text-white">Features</a>
        <a href="#" class="hover:text-white">Customers</a>
        <a href="#" class="hover:text-white">Pricing</a>
        <a href="#" class="hover:text-white">Help</a>
        <a href="#" class="hover:text-white">Careers</a>
      </nav>
      <div class="flex justify-center gap-6 mt-6">
        <font-awesome-icon
          :icon="['fab', 'facebook']"
          class="text-[#BCBCBC] text-xl"
        />
        <font-awesome-icon
          :icon="['fab', 'instagram']"
          class="text-[#BCBCBC] text-xl"
        />
        <font-awesome-icon
          :icon="['fab', 'linkedin']"
          class="text-[#BCBCBC] text-xl"
        />
        <font-awesome-icon
          :icon="['fab', 'pinterest']"
          class="text-[#BCBCBC] text-xl"
        />
        <font-awesome-icon
          :icon="['fab', 'youtube']"
          class="text-[#BCBCBC] text-xl"
        />
      </div>
      <p class="mt-6">&copy; 2024 Trackly, Inc. All rights reserved.</p>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faPinterest,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import logoSrc from "@/assets/logosaas.png";

// Add icons to the library
library.add(faFacebook, faInstagram, faLinkedin, faPinterest, faYoutube);

export default defineComponent({
  name: "Footer",
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      logoSrc,
    };
  },
});
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
