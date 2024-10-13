<template>
  <div
    class="-mt-[90px] pt-[90px] bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
  >
    <div class="container flex flex-col justify-center lg:px-[350px] pb-[80px]">
      <h1
        class="text-2xl md:text-3xl font-bold tracking-tighter text-center mt-20"
      >
        Edit Your Reminder
      </h1>
      <div
        class="bg-[#90A2E4] bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg mt-10 px-8 pb-10 pt-2 rounded-lg"
      >
        <form @submit.prevent="handleSubmit">
          <!-- Title input field -->
          <div class="mb-4 mt-8">
            <input
              id="title"
              v-model="title"
              type="text"
              required
              placeholder="Enter reminder title"
              class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-black"
            />
          </div>

          <!-- Description input field -->
          <div class="mb-4">
            <textarea
              id="description"
              v-model="description"
              required
              placeholder="Enter reminder description"
              class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-black"
              rows="4"
            ></textarea>
          </div>

          <!-- Duration input field -->
          <div class="mb-4">
            <input
              id="duration"
              v-model="duration"
              type="text"
              required
              placeholder="Enter reminder duration (e.g., 2 days, 1 week)"
              class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-black"
            />
          </div>

          <!-- Notification Date and Time -->
          <p class="font-semibold">When to notify me</p>
          <div class="mb-4 w-full flex flex-row gap-4 mt-2">
            <div>
              <input
                id="notifydate"
                v-model="notifydate"
                type="date"
                required
                class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-black"
              />
            </div>
            <div>
              <input
                id="notifytime"
                v-model="notifytime"
                type="time"
                required
                class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-black"
              />
            </div>
          </div>

          <!-- Tasks Section -->
          <div class="mb-4">
            <h3 class="font-semibold">Tasks</h3>

            <!-- Render each task -->
            <div
              v-for="(task, index) in tasks"
              :key="index"
              class="mt-4 p-4 bg-[#ffffff] bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-md rounded-md"
            >
              <h4 class="font-semibold">Task {{ index + 1 }}</h4>

              <!-- Task Title -->
              <div class="mb-4">
                <input
                  v-model="task.title"
                  type="text"
                  placeholder="Task title"
                  class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-black"
                  required
                />
              </div>

              <!-- Task Description -->
              <div class="mb-4">
                <textarea
                  v-model="task.description"
                  placeholder="Task description"
                  class="w-full p-2 bg-transparent text-black border border-black rounded-md outline-none placeholder-black"
                  rows="3"
                  required
                ></textarea>
              </div>

              <!-- Remove Task Button -->
              <button
                type="button"
                @click="removeTask(index)"
                class="mt-4 px-4 py-2 bg-black text-white rounded-md"
              >
                Remove Task
              </button>
            </div>

            <!-- Add Task Button -->
            <button
              type="button"
              @click="addTask"
              class="mt-4 w-full py-2 bg-white text-black rounded-md"
            >
              Add Task
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-2 bg-black text-white rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-black"
          >
            Save Changes
          </button>

          <p v-if="errorMessage" class="text-red-500 text-center mt-2">
            {{ errorMessage }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import axios from "axios";
import { format } from "date-fns";

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const id = route.params.id;

    // Form data
    const title = ref("");
    const description = ref("");
    const duration = ref("");
    const notifydate = ref("");
    const notifytime = ref("");
    const tasks = ref([]);

    onMounted(async () => {
      try {
        await store.dispatch("fetchReminder", id);
        const reminder = store.getters.reminder;
        title.value = reminder?.title || "";
        description.value = reminder?.description || "";
        duration.value = reminder?.duration || "";
        notifydate.value = reminder?.notifydate
          ? format(new Date(reminder.notifydate), "yyyy-MM-dd")
          : "";
        notifytime.value = reminder?.notifytime
          ? format(new Date(`1970-01-01T${reminder.notifytime}:00`), "HH:mm")
          : "";
        tasks.value = reminder?.tasks || [];
      } catch (error) {
        console.error("Error fetching reminder:", error);
      }
    });

    const handleSubmit = async () => {
      try {
        // Prepare the data to send to the server
        const updatedReminder = {
          title: title.value,
          description: description.value,
          duration: duration.value,
          notifydate: notifydate.value,
          notifytime: notifytime.value,
          tasks: tasks.value,
        };

        const response = await axios.put(
          `https://trackly-app.vercel.app/reminders/${id}`,
          updatedReminder
        );
        if (response.status === 200) {
          console.log("Reminder updated successfully.");
          router.push("/profile");
        }
      } catch (error) {
        console.error("Error updating reminder:", error);
        // Handle the error, e.g., show an error message
      }
    };

    const addTask = () => {
      tasks.value.push({ title: "", description: "" });
    };

    const removeTask = (index) => {
      tasks.value.splice(index, 1);
    };

    return {
      title,
      description,
      duration,
      notifydate,
      notifytime,
      tasks,
      handleSubmit,
      addTask,
      removeTask,
    };
  },
};
</script>
