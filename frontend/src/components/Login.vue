<template>
  <section
    class="pb-[150px] pt-[190px] lg:-mt-[80px] -mt-[90px] bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
  >
    <div class="container">
      <div class="md:flex md:flex-row-reverse justify-between items-center">
        <div class="md:w-[478px]">
          <h1
            class="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-black to-[#001E80] text-transparent bg-clip-text mt-6"
          >
            Lets Log In
          </h1>
          <p class="text-xl text-[#010D3E] tracking-tight mt-6">
            Log In to get started and maintain your reminders at your
            convenience
          </p>
          <div class="flex gap-1 items-center mt-[10px]">
            <router-link to="/">
              <button
                class="px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center tracking-tight bg-black text-white"
              >
                Back to Home Page
              </button>
            </router-link>
          </div>
        </div>

        <div class="md:mt-[0px] mt-[40px]">
          <Lform />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logoSrc from "@/assets/logo.png";
import Lform from "@/components/Lform.vue"; // Import the existing Sform component

export default defineComponent({
  name: "Signup",
  components: {
    FontAwesomeIcon,
    Lform, // Register Sform component
  },
  data() {
    return {
      logoSrc,
      menuIcon: faBars,
    };
  },
});
</script>

<style scoped>
/* Add your styles here */
</style>
