<template>
  <section
    class="-mt-[90px] pt-[90px] bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
  >
    <div class="container">
      <div class="flex flex-row justify-between items-center mt-20">
        <div>
          <div class="flex flex-row items-center gap-4">
            <h1 class="text-2xl md:text-3xl font-bold tracking-tighter mt-6">
              Hey, {{ loggedInUser }}
            </h1>
            <img
              src="../assets/hand.svg"
              alt="Arrow Icon"
              class="h-7 w-7 mt-[10px] waving"
            />
          </div>
          <p class="text-l text-[#191919] tracking-tight mt-2">
            Manage your reminders here easily.
          </p>
        </div>
        <div>
          <router-link to="/create">
            <button
              class="px-4 py-2 rounded-lg font-medium inline-flex gap-2 items-center justify-center tracking-tight bg-black text-white"
            >
              <span class="font-bold text-2xl">+</span> Create new reminder
            </button>
          </router-link>
        </div>
      </div>

      <!-- Loading state -->
      <div v-if="loading" class="flex justify-center items-center mt-20"></div>

      <!-- No reminders message -->
      <div
        v-else-if="reminders.length === 0"
        class="flex flex-col items-center justify-center mt-20 gap-3 pb-[80px]"
      >
        <h2 class="text-xl font-semibold text-black">
          You have no reminders yet.
        </h2>
        <router-link to="/create">
          <button
            class="px-4 py-2 rounded-lg font-medium inline-flex gap-2 items-center justify-center tracking-tight bg-black text-white"
          >
            <span class="font-bold text-2xl">+</span> Create your first reminder
          </button>
        </router-link>
      </div>

      <!-- Display reminders -->
      <div
        v-else
        class="lg:max-w-[80%] max-w-[100%] flex flex-col justify-start mt-20 gap-6 pb-20 z-1"
      >
        <div
          v-for="reminder in reminders"
          :key="reminder._id"
          class="flex lg:flex-row flex-col justify-between bg-[#d6dfff] bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 py-5 items-center rounded-xl lg:px-10 px-3"
        >
          <div class="flex flex-row items-start gap-6">
            <div>
              <div
                class="bg-[#bae2ff] bg-opacity-10 backdrop-blur-lg w-[60px] h-[60px] flex justify-center items-center rounded-full"
              >
                <img src="../assets/bell.svg" alt="bellIcon" class="h-5 w-5" />
              </div>
            </div>

            <div class="flex flex-col lg:pb-[0px] pb-[50px] gap-0">
              <p class="text-[20px] text-[#191919] font-semibold">
                {{ reminder.title }}
              </p>
              <p class="text-[15px] text-[#191919]">
                {{ reminder.description }}
              </p>
              <p class="text-[12px] font-semibold mt-2 text-[#191919]">
                Duration: {{ reminder.duration }}
              </p>
              <router-link :to="`/reminder/${reminder._id}`">
                <button
                  class="rounded-lg font-sm py-1 mt-1 px-3 tracking-tight text-[12px] items-center bg-[#191919] text-white"
                >
                  View Details
                </button>
              </router-link>
            </div>
          </div>
          <div class="flex flex-row items-center gap-3">
            <p
              v-if="reminder.completed"
              class="bg-[#bae2ff] font-semibold px-2 py-2 rounded-md text-[13px] text-[#191919] bg-opacity-10 backdrop-blur-lg"
            >
              Completed
            </p>
            <button
              class="bg-[#bae2ff] font-semibold px-2 py-2 rounded-md text-[13px] text-[#191919] bg-opacity-10 backdrop-blur-lg"
              v-if="!reminder.completed"
              @click="markAsCompleted(reminder._id)"
            >
              Mark as Completed
            </button>
            <router-link :to="`/edit/${reminder._id}`">
              <img
                src="../assets/edit.svg"
                alt="edit"
                class="h-4 w-4 cursor-pointer"
              />
            </router-link>

            <img
              src="../assets/delete.svg"
              alt="delete"
              class="h-4 w-4 cursor-pointer"
              @click="deleteReminder(reminder._id)"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";

export default {
  name: "Profilepage",
  data() {
    return {
      loggedInUser: "",
      reminders: [],
      loading: true,
    };
  },
  mounted() {
    this.getCurrentUser();
    this.fetchReminders();
    this.checkAuthentication();
  },
  methods: {
    getCurrentUser() {
      this.loggedInUser = localStorage.getItem("loggedInUser") || "Guest";
    },
    checkAuthentication() {
      const router = useRouter();
      const isAuthenticated = localStorage.getItem("loggedInUser"); // Check if user is authenticated
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page if not authenticated
      } else {
        this.getCurrentUser(); // Get current user details if authenticated
      }
    },
    async fetchReminders() {
      try {
        this.loading = true;

        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found. User might not be logged in.");
          return;
        }

        const response = await axios.get("https://trackly-app.vercel.app/reminders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        this.reminders = response.data.reminders;
      } catch (error) {
        console.error("Error fetching reminders:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteReminder(reminderId) {
      const toast = useToast();
      try {
        await axios.delete(`https://trackly-app.vercel.app/reminders/${reminderId}`);
        console.log("Reminder deleted successfully.");
        await this.fetchReminders();
        toast.success("Reminder deleted successfully!");
      } catch (error) {
        console.error("Error deleting reminder:", error);
      }
    },
    async markAsCompleted(reminderId) {
      const toast = useToast();
      try {
        const response = await axios.patch(
          `https://trackly-app.vercel.app/reminders/${reminderId}/complete`
        );
        const updatedReminder = response.data.reminder;

        // Update the reminders list locally to reflect the change
        this.reminders = this.reminders.map((reminder) =>
          reminder._id === updatedReminder._id ? updatedReminder : reminder
        );

        console.log("Reminder marked as completed successfully");
        toast.success("Reminder Marked as Completed successfully!");
      } catch (error) {
        console.error("Error marking reminder as completed:", error);
      }
    },
  },
};
</script>

<style scoped>
@keyframes wave {
  0% { transform: rotate(0deg); }
  20% { transform: rotate(-15deg); }
  40% { transform: rotate(10deg); }
  60% { transform: rotate(-15deg); }
  80% { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
}

/* Apply the animation to the element */
.waving {
  animation: wave 2s ease-in-out infinite;
  transform-origin: 70% 70%;
}
</style>
