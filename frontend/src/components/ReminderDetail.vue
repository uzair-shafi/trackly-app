<template>
  <section
    class="-mt-[90px] pt-[90px] bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] overflow-x-clip"
  >
    <div class="container">
      <div class="flex flex-row justify-between items-center mt-20">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold tracking-tighter mt-6">
            {{ reminder ? reminder.title : "Loading Reminder..." }}
          </h1>
          <p class="text-l text-[#191919] tracking-tight mt-2">
            {{ reminder ? reminder.description : "Fetching description..." }}
          </p>

          <div class="text-sm inline-flex border border-[#222]/20 mt-6 px-3 py-1 rounded-lg tracking-tight">
            <span class="font-semibold pr-2">Duration: </span>
            {{ reminder ? reminder.duration : "Loading..." }}
          </div>

          <div class="lg:ml-2 text-sm inline-flex border border-[#222]/20 mt-6 px-3 py-1 rounded-lg tracking-tight">
            <span class="font-semibold pr-2">Notify me on: </span>
            {{ formattedNotifyDate || "Loading..." }}
            <span class="font-semibold ml-2 pr-2">at:</span>
            {{ formattedNotifyTime || "Loading..." }}
          </div>
        </div>
        <div v-if="reminder">
          <div class="flex lg:flex-row flex-col items-center gap-5">
            <router-link :to="`/edit/${reminder._id}`">
              <img src="../assets/edit.svg" alt="edit" class="h-4 w-4 cursor-pointer" />
            </router-link>

            <button
              @click="deleteReminder(reminder._id)"
              class="px-4 py-2 rounded-lg font-medium inline-flex gap-2 items-center justify-center tracking-tight bg-black text-white"
            >
              Delete this reminder
            </button>
          </div>
        </div>
      </div>

      <div class="lg:max-w-[80%] max-w-[100%] flex flex-col justify-start mt-14">
        <h1 class="text-xl md:text-xl font-bold tracking-tighter mt-6">
          Tasks For this Reminder
        </h1>
        <div class="mt-6 gap-6 pb-20">
          <div
            v-for="task in reminder?.tasks || []"
            :key="task.id"
            class="flex lg:flex-row justify-between bg-[#d6dfff] bg-opacity-10 backdrop-blur-lg border border-white border-opacity-10 py-5 items-center rounded-xl lg:px-10 px-3 mb-4"
          >
            <div class="flex flex-row gap-6">
              <div>
                <div class="bg-[#bae2ff] bg-opacity-10 backdrop-blur-lg w-[60px] h-[60px] flex justify-center items-center rounded-full">
                  <img src="../assets/checkicon.svg" alt="bellIcon" class="h-6 w-7" />
                </div>
              </div>
              <div class="flex flex-col lg:pb-[0px] pb-[50px] gap-2">
                <p class="text-[20px] text-[#191919] font-semibold" :class="{ 'line-through': task.completed }">
                  {{ task.title || "No Title" }}
                </p>
                <p class="text-[15px] text-[#191919]">
                  {{ task.description || "No Description" }}
                </p>
              </div>
            </div>
            <div class="flex flex-row items-center gap-3">
              <button
                v-if="!task.completed"
                @click="markTaskAsCompleted(reminder._id, task._id)"
                class="cursor-pointer font-semibold px-2 py-2 rounded-md text-[13px] bg-[#bae2ff] bg-opacity-10 backdrop-blur-lg text-[#191919]"
              >
                Mark as Completed
              </button>
              <span
                v-else
                class="font-semibold px-2 py-2 rounded-md text-[13px] text-[#191919] bg-[#bae2ff] bg-opacity-10 backdrop-blur-lg"
              >
                Completed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, onMounted } from "vue";
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

    onMounted(async () => {
      try {
        await store.dispatch("fetchReminder", id);
        console.log("Reminder fetched successfully:", store.getters.reminder);
      } catch (error) {
        console.error("Error fetching reminder:", error);
      }
    });

    const reminder = computed(() => {
      const reminderData = store.getters.reminder;
      console.log("Current reminder data:", reminderData);
      return reminderData;
    });

    const formattedNotifyDate = computed(() => {
      if (reminder.value?.notifydate) {
        return format(new Date(reminder.value.notifydate), "MMM d, yyyy");
      }
      return "";
    });

    const formattedNotifyTime = computed(() => {
      if (reminder.value?.notifytime) {
        return format(
          new Date(`1970-01-01T${reminder.value.notifytime}:00`),
          "hh:mm a"
        );
      }
      return "";
    });

    const deleteReminder = async (reminderId) => {
      try {
        const response = await axios.delete(
          `https://trackly-app.vercel.app/reminders/${reminderId}`
        );
        if (response.status === 200) {
          console.log("Reminder deleted successfully.");
          router.push("/profile");
        }
      } catch (error) {
        console.error("Error deleting reminder:", error);
      }
    };

    const markTaskAsCompleted = async (reminderId, taskId) => {
      try {
        const response = await axios.patch(
          `https://trackly-app.vercel.app/reminders/${reminderId}/tasks/${taskId}/complete`
        );
        if (response.status === 200) {
          console.log("Task marked as completed.");
          await store.dispatch("fetchReminder", reminderId); // Fetch the updated reminder data
        }
      } catch (error) {
        console.error("Error marking task as completed:", error);
      }
    };

    return {
      reminder,
      formattedNotifyDate,
      formattedNotifyTime,
      deleteReminder,
      markTaskAsCompleted,
    };
  },
};
</script>

<style scoped>
.task-card {
  transform: rotate(-2deg); /* Default tilt */
  transition: transform 0.3s ease-in-out; /* Smooth transition */
}

.task-card:hover {
  transform: rotate(0deg); /* Straighten on hover */
}
.sticky-note-effect {
  background-color: #fef08a;

  box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.1),
    -4px -4px 6px rgba(255, 255, 255, 0.5); /* Depth effect */
  transform: rotate(-2deg);
  position: relative;
  padding-top: 20px;
  transition: transform 0.3s ease-in-out;
}
</style>
