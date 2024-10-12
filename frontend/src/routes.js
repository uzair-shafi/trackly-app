import { createRouter, createWebHistory } from "vue-router";

import Login from "@/components/Login.vue";
import Home from "@/components/Home.vue";
import Signup from "@/components/Signup.vue";
import Sform from "@/components/Sform.vue";
import Profilepage from "@/components/Profilepage.vue";
import CreateReminder from "@/components/CreateReminder.vue";
import ReminderDetail from "@/components/ReminderDetail.vue";
import EditReminder from "@/components/EditReminder.vue";

const routes = [
  {
    path: "/edit/:id",
    name: "EditReminder",
    component: EditReminder,
    props: true,
  },
  {
    path: "/create",
    name: "CreateReminder",
    component: CreateReminder,
  },
  {
    path: "/reminder/:id",
    name: "ReminderDetail",
    component: ReminderDetail,
    props: true,
  },
  {
    path: "/profile",
    name: "Profilepage",
    component: Profilepage,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
