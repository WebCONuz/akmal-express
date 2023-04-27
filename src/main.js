import { createApp } from "vue";
import { createPinia } from "pinia";
import { createI18n } from "vue-i18n";
import { languages } from "./localization/index";
import { langLocaleDefault } from "./localization/index";
import Paginate from "vuejs-paginate-next";

import App from "./App.vue";
import router from "./router";

import VueDatePicker from "@vuepic/vue-datepicker";

import "@vuepic/vue-datepicker/dist/main.css";
import "vue3-toastify/dist/index.css";
import "./assets/main.css";

// Locale languages
const messages = Object.assign(languages);
const langLocalStorage = localStorage.getItem("lang");
const i18n = createI18n({
  legacy: false,
  locale: langLocalStorage || langLocaleDefault,
  fallbackLocale: "uz",
  messages,
});

// Create App
const app = createApp(App);
app.component("VueDatePicker", VueDatePicker);
app.use(Paginate);
app.use(createPinia());
app.use(router);
app.use(i18n);
app.mount("#app");
