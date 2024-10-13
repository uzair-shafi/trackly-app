<template>
  <div
    class="signup-form bg-[#90A2E4] bg-opacity-10 backdrop-blur-md border border-white justify-center border-opacity-20 shadow-lg p-10 rounded-lg"
  >
    <form @submit.prevent="handleSubmit">
      <!-- Name input field -->
      <div class="mb-4">
        <input
          id="name"
          v-model="name"
          type="text"
          required
          placeholder="Enter your name"
          class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-gray-600"
        />
      </div>

      <!-- Email input field -->
      <div class="mb-4">
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
          class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-gray-600"
        />
      </div>

      <!-- Password input field -->
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
        Sign Up
      </button>

      <p class="text-center text-[14px] mt-3">
        Already Signed up?
        <router-link to="/login">
          <span class="underline font-bold">Login</span>
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
  name: "Sform",
  data() {
    return {
      name: "", // Correct field name
      email: "", // Correct field name
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await axios.post("https://trackly-app.vercel.app/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        });

        if (response.status === 201) {
          this.$router.push("/login");
        }
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "An error occurred";
        console.error("Error during signup:", error);
      }
    },
  },
};
</script>

<style scoped>
/* Additional scoped styles if needed */
</style>
