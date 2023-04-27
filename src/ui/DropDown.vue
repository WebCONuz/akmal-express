<script setup>
import { initFlowbite } from "flowbite";
import { useDark, useToggle } from "@vueuse/core";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";

const isDark = useDark();
const toggleDark = useToggle(isDark);
const dark = localStorage.getItem("vueuse-color-scheme");
function clickMode(event) {
  toggleDark();
}

const { t, locale } = useI18n({ useScope: "global" });
const select = ref("");
function changeLang(e) {
  select.value = e.target.value;
  locale.value = select.value;
  localStorage.setItem("lang", select.value);
}

onMounted(() => {
  initFlowbite();
});
</script>
<template>
  <button
    id="dropdownDefaultButton"
    data-dropdown-toggle="dropdown"
    class="flex items-center w-full"
    type="button"
  >
    <i class="bx bx-cog mr-[15px] text-xl"></i>
    {{ t("sidebar.settings.title") }}
    <svg
      class="w-4 h-4 ml-2"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  </button>
  <!-- Dropdown menu -->
  <div
    id="dropdown"
    class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800"
  >
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefaultButton"
    >
      <li>
        <a
          href="#"
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              class="sr-only peer"
              @click="clickMode"
              :checked="dark == 'dark' ? true : false"
            />
            <div
              class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-gray-500 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-red-300"
            ></div>
            <span
              class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >{{ t("sidebar.settings.darkmode") }}</span
            >
          </label>
        </a>
      </li>
      <li>
        <select
          name=""
          id=""
          class="w-full outline-none rounded-md border-none dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-100"
          @change="changeLang"
        >
          <option value="uz">{{ t("sidebar.settings.uz") }}</option>
          <option value="ru">{{ t("sidebar.settings.ru") }}</option>
        </select>
      </li>
    </ul>
  </div>
</template>
