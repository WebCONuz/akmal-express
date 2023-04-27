<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });
const dateByZone = ref();

const props = defineProps({
  name: String,
  uniqueID: String,
  date: String,
  sum: String,
  advence: String,
  link: String,
  phone: String,
  num: Number,
  ID: Number,
  status: Number,
});

dateByZone.value = new Date(props.date)
  .toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })
  .split(" ");
</script>

<template>
  <tr
    class="border-b text-gray-800 dark:bg-gray-800 dark:border-gray-700"
    :class="
      Math.ceil((new Date(props.date) - new Date()) / (1000 * 60 * 60 * 24)) <
      60
        ? 'bg-green-100  dark:bg-green-900'
        : (new Date(props.date) - new Date()) / (1000 * 60 * 60 * 24) < 90
        ? 'bg-orange-50 dark:bg-orange-800'
        : 'bg-red-200 dark:bg-red-900'
    "
  >
    <td class="px-6 py-4 dark:text-gray-400">
      {{ props.num }}
    </td>
    <td class="px-6 py-4 text-blue-600 cursor-pointer">
      <router-link :to="'/admin/order/' + props.ID">
        {{ props.uniqueID }}
      </router-link>
    </td>
    <td class="px-6 py-4 dark:text-gray-400">
      {{ dateByZone[0] }} &nbsp;
      {{ dateByZone[1].split(":")[0] + ":" + dateByZone[1].split(":")[1] }}
    </td>
    <td class="px-6 py-4 dark:text-gray-400">{{ props.name }}</td>
    <td class="px-6 py-4 dark:text-gray-400">
      <a :href="props.link" target="_blank" class="text-blue-600"
        >Product link</a
      >
    </td>
    <td class="px-6 py-4 dark:text-gray-400">{{ props.sum }}</td>
    <td class="px-6 py-4 dark:text-gray-400">{{ props.advence }}</td>
    <td class="px-6 py-4 dark:text-gray-400">
      {{
        props.status == 0
          ? t("newOrder.t_body.status_1")
          : props.status == 1
          ? t("newOrder.t_body.status_2")
          : t("newOrder.t_body.status_3")
      }}
    </td>
    <td class="px-6 py-4 dark:text-gray-400">{{ props.phone }}</td>
  </tr>
</template>

<style lang="css"></style>
