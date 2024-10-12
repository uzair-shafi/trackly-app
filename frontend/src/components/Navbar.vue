<template>
  <section class="backdrop-blur-sm z-20 relative">
    <div class="py-5">
      <div class="container">
        <div class="flex items-center justify-between">
          <router-link to="/">
            <img
              :src="logoSrc"
              alt="Saas Logo"
              class="cursor-pointer h-10 w-10"
            />
          </router-link>

          <nav class="flex gap-6 text-black/60 items-center relative">
            <div class="relative items-center w-[23px] h-[23px]">
              <!-- Notification icon container -->
              <div
                class="relative items-center"
                @click="toggleDropdown"
                ref="notificationsRef"
              >
                <img
                  src="../assets/bell.svg"
                  alt="notifications"
                  class="h-[24px] w-[24px] object-cover cursor-pointer"
                />
                <!-- Notification badge -->
                <div
                  class="absolute top-0 right-0 w-[8px] h-[8px] bg-pink-500 rounded-full ring-2 ring-white"
                ></div>
              </div>
            </div>

            <!-- Notification Dropdown -->
            <div
              v-if="dropdownVisible"
              class="absolute top-16 right-12 mt-3 min-w-[400px] shadow-xl z-[1000] rounded-xl bg-navyBlue"
            >
              <NotiDropdown />
            </div>

            <!-- Dynamic Button: Login or Logout -->
            <router-link v-if="!isLoggedIn" to="/signup">
              <button
                class="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight"
              >
                Sign In
              </button>
            </router-link>

            <button
              v-else
              @click="handleLogout"
              class="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex align-items justify-center tracking-tight"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from "vue";
import NotiDropdown from "./NotiDropdown.vue";
import logoSrc from "@/assets/logo.png";

export default defineComponent({
  name: "Navbar",
  components: {
    NotiDropdown,
  },
  data() {
    return {
      logoSrc,
      isLoggedIn: false,
      dropdownVisible: false,
    };
  },
  setup() {
    const notificationsRef = ref(null);
    const dropdownVisible = ref(false);

    const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
    };

    const handleClickOutside = (event) => {
      if (
        notificationsRef.value &&
        !notificationsRef.value.contains(event.target)
      ) {
        dropdownVisible.value = false;
      }
    };

    onMounted(() => {
      document.addEventListener("click", handleClickOutside);
    });

    onUnmounted(() => {
      document.removeEventListener("click", handleClickOutside);
    });

    return {
      notificationsRef,
      dropdownVisible,
      toggleDropdown,
    };
  },
  methods: {
    updateLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem("token");
    },
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("loggedInUser");
      this.updateLoginStatus();
      setTimeout(() => {
        this.$router.push("/login");
      });
    },
  },
  created() {
    this.updateLoginStatus();
  },
  watch: {
    $route() {
      this.updateLoginStatus();
    },
  },
});
</script>

<style scoped>
/* Add any additional styling here */
</style>
