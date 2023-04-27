<script setup>
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Modal from "./Modal.vue";
import { toast } from "vue3-toastify";
const { t, locale } = useI18n({ useScope: "global" });
const props = defineProps({
  id: Number,
  num: Number,
  name: String,
  date: String,
  username: String,
  status: Boolean,
  role: Boolean,
  activate: Function,
});
function activateAdmin(res) {
  if (res === true) {
    props.activate({
      id: props.id,
      value: !props.status,
    });
    if (props.status) {
      toast.success(`${props.name} ${t("toasts.epmloyee.noactive")}`);
    } else {
      toast.success(`${props.name} ${t("toasts.epmloyee.active")}`);
    }
  } else {
    props.activate({
      id: props.id,
      value: props.status,
    });
  }
}

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    <td class="px-6 py-4">
      <button
        class="w-6 h-6 rounded-full border-2 outline-none"
        :class="
          props.role
            ? 'border-green-500 bg-green-500'
            : !props.status
            ? 'border-red-500 bg-red-400'
            : 'border-gray-300'
        "
        :disabled="props.role"
        :data-modal-toggle="'active-admin-modal' + props.id"
        :data-modal-target="'active-admin-modal' + props.id"
      ></button>
    </td>
    <td class="px-6 py-4 dark:text-gray-400">{{ props.num }}</td>
    <td class="px-6 py-4 text-blue-600 dark:text-gray-400">{{ props.name }}</td>
    <td class="px-6 py-4 dark:text-gray-400">{{ props.date }}</td>
    <td class="px-6 py-4 dark:text-gray-400">{{ props.username }}</td>
    <td class="px-6 py-4 dark:text-gray-400">
      {{
        props.status ? t("addUser.t_body.active") : t("addUser.t_body.inactive")
      }}
    </td>
    <td class="px-6 py-4 dark:text-gray-400">
      {{
        props.role ? t("addUser.t_body.super_admin") : t("addUser.t_body.admin")
      }}
    </td>
  </tr>
  <Modal
    :modalId="'active-admin-modal' + props.id"
    :textContent="t('modal.activate')"
    :isChecked="activateAdmin"
  />
</template>

<style lang="css"></style>
