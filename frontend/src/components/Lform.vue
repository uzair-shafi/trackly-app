<template>
  <div
    class="signup-form bg-[#90A2E4] bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg p-10 rounded-lg"
  >
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <input
          id="email"
          v-model="email"
          type="text"
          required
          placeholder="Enter your email"
          class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-gray-600"
        />
      </div>
      <div class="mb-4">
        <input
          id="password"
          v-model="password"
          type="password"
          required
          placeholder="Enter your password"
          class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-gray-600"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 bg-black text-white rounded-md font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
      >
        Log In
      </button>
      <p class="text-center text-[14px] mt-3">
        Don't have an account?
        <router-link to="/signup">
          <span class="underline font-bold">Signup</span>
        </router-link>
      </p>

      <p v-if="errorMessage" class="text-red-500 text-center mt-2">
        {{ errorMessage }}
      </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("https://trackly-app.vercel.app/auth/login", {
          email: this.email,
          password: this.password,
        });

        if (response.status === 200 && response.data.success) {
          const { jwtToken, name } = response.data;

          // Store token and user info in localStorage
          localStorage.setItem("token", jwtToken);
          localStorage.setItem("loggedInUser", name);

          // Redirect to profile page after login
          this.$router.push("/profile");
        } else {
          this.errorMessage = response.data.message || "Login failed";
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "An error occurred during login";
        console.error("Error during login:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
