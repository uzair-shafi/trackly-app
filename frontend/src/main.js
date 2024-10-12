import "./index.css";
import "@fontsource/inter";
import router from "./routes";
import "@fontsource/inter/400.css"; // Regular weight
import "@fontsource/inter/600.css"; // Semi-bold weight
import "@fontsource/inter/700.css"; // Bold weight

import { createApp } from "vue";
import App from "./App.vue";

// Import Vue Toastification and its CSS
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from "./store";
// Toast options
const toastOptions = {
  position: "bottom-right", // Position the toast at the bottom-right
  timeout: 3000, // Toast will disappear after 3 seconds
};

// Create Vue application and configure global plugins
const app = createApp(App);

// Use Toastification globally with defined options
app.use(Toast, toastOptions);

// Use Vue router
app.use(router);
app.use(store);
// Mount the app
app.mount("#app");
