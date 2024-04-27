import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
import { createRouter, createWebHistory } from "vue-router/auto";

import { createApp } from "vue";
import App from "./App.vue";

const router = createRouter({
  history: createWebHistory(),
});

createApp(App).use(router).mount("#app");
