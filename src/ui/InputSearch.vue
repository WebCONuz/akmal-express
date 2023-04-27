<script setup>
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });
</script>

<template>
  <div>
    <div
      class="relative flex items-center w-[655px] h-[52px] rounded-[3px] border focus-within:border-none focus-within:shadow-lg bg-white overflow-hidden"
    >
      <div
        class="grid place-items-center h-full w-12 text-gray-300 dark:bg-gray-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        class="border-none h-full w-full outline-none text-sm text-gray-700 pr-2 focus:ring-0 dark:bg-gray-700 dark:text-white"
        type="text"
        id="search"
        :placeholder="t('header.search')"
      />
    </div>
  </div>
</template>

<style lang="css"></style>
