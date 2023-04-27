<script setup>
import EployeeRow from "../../ui/EmployeeRow.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });

const props = defineProps({
  data: {
    required: true,
    type: Object,
  },
  activate: {
    required: true,
    type: Function,
  },
});
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead
        class="border-b text-gray-700 lowercase bg-white dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-4"></th>
          <th scope="col" class="px-6 py-4">
            {{ t("addUser.t_head.table_num") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("addUser.t_head.table_fullname") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("addUser.t_head.table_addDate") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("addUser.t_head.table_username") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("addUser.t_head.table_activity") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("addUser.t_head.table_role") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <EployeeRow
          v-for="(item, index) in props.data"
          :id="item.id"
          :num="index + 1"
          :name="item.full_name"
          :date="item.createdAt.slice(0, 10)"
          :username="item.user_name"
          :status="item.is_active"
          :role="item.is_creator"
          :activate="props.activate"
        />
      </tbody>
    </table>
  </div>
</template>

<script></script>
