import { createStore } from "vuex";
import axios from "axios"; // Import axios

const store = createStore({
  state() {
    return {
      reminder: null,
    };
  },
  mutations: {
    setReminder(state, reminder) {
      state.reminder = reminder;
    },
  },
  actions: {
    async fetchReminder({ commit }, id) {
      try {
        const response = await axios.get(
          `https://trackly-app.vercel.app/reminders/${id}`
        );
        commit("setReminder", response.data.reminder);
      } catch (error) {
        console.error("Error fetching reminder details:", error);
      }
    },
  },
  getters: {
    reminder(state) {
      return state.reminder;
    },
  },
});

export default store;
