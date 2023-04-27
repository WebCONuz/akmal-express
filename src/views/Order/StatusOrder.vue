<script setup>
import Text from "../../ui/Text.vue";
import StatusInput from "../../ui/StatusInput.vue";
import Modal from "../../ui/Modal.vue";

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import useOrderStore from "@/stores/orderStore";
import useOperationStore from "@/stores/operationStore";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";

const { t, locale } = useI18n({ useScope: "global" });
const orderStore = useOrderStore();
const operationStore = useOperationStore();

const order = ref({});
const operations = ref([]);
const lastOperationStatus = ref();
const route = useRoute();

const lastOperation = (arr) => {
  if (arr.length === 1) return arr[0].status;
  else if (arr.length === 2) {
    return Math.max(+arr[0].status, +arr[1].status);
  } else if (arr.length === 3) {
    return Math.max(+arr[0].status, Math.max(+arr[1].status, +arr[2].status));
  } else {
    return 0;
  }
};

const getOrder = async () => {
  const id = route.params.id;
  await orderStore.getOne(id);
  order.value = orderStore.order;
  operations.value = order.value.operation;
  lastOperationStatus.value = lastOperation(order.value.operation);
};

const passPending = async (val) => {
  if (val) {
    const res = await operationStore.create({
      admin_id: +localStorage.getItem("id"),
      order_id: +route.params.id,
      status: "1",
    });
    if (res) {
      toast.success(t("toasts.order.pending"));
    }
    getOrder();
  }
};

const passFinnished = async (val) => {
  if (val) {
    const res = await operationStore.create({
      admin_id: +localStorage.getItem("id"),
      order_id: +route.params.id,
      status: "2",
    });
    if (res) {
      toast.success(t("toasts.order.finish"));
    }
    getOrder();
  }
};

const forceMajor = async (e) => {
  if (e.key === "Enter") {
    const id = route.params.id;
    const res = await orderStore.updateOrder(id, {
      description: e.target.value,
    });
    e.target.value = "";
    if (res) {
      toast.success(t("toasts.order.comment"));
    }
  }
  getOrder();
};

const restart = async (val) => {
  console.log(val);
  if (val) {
    const id = route.params.id;
    const res1 = await operationStore.deleteOperation(id);
    const res2 = await orderStore.updateOrder(id, {
      description: null,
    });
    if (res1 && res2) {
      toast.success(t("toasts.order.restart"));
    }
    getOrder();
  }
};

onMounted(() => {
  getOrder();
});
</script>

<template>
  <div class="py-4 my-6">
    <Text :text="t('status.title')" class="mb-4" />
    <div class="flex items-center justify-between">
      <StatusInput
        type="button"
        :value="t('status.t_body.status_1')"
        :text="t('status.step1')"
        :inputClass="
          lastOperationStatus == 4
            ? 'bg-[#8DF8FF]'
            : 'bg-gray-300 dark:bg-gray-500 dark:text-gray-400'
        "
        elmWidth="w-[13%]"
        :disabledValue="lastOperationStatus != 4 ? true : false"
      />
      <StatusInput
        type="button"
        :value="t('status.t_body.status_2')"
        :text="t('status.step2')"
        :inputClass="
          lastOperationStatus == 0
            ? 'bg-[#8DF8FF]'
            : 'bg-gray-300 dark:bg-gray-500 dark:text-gray-400'
        "
        elmWidth="w-[15%]"
        :disabledValue="lastOperationStatus == 0 ? false : true"
        data-modal-target="waited-order"
        data-modal-toggle="waited-order"
      />
      <StatusInput
        type="button"
        :value="t('status.t_body.status_3')"
        :text="t('status.step3')"
        :inputClass="
          lastOperationStatus == 1
            ? 'bg-[#8DF8FF]'
            : 'bg-gray-300 dark:bg-gray-500 dark:text-gray-400'
        "
        elmWidth="w-[16%]"
        :disabledValue="lastOperationStatus == 1 ? false : true"
        data-modal-target="finished-order"
        data-modal-toggle="finished-order"
      />
      <StatusInput
        :placeholder="t('status.placeholder')"
        elmWidth="w-[24%]"
        :text="t('status.force')"
        :inputClass="
          lastOperationStatus == 2
            ? 'bg-gray-300 dark:bg-gray-500 dark:text-gray-400'
            : 'dark:bg-gray-700 dark:text-gray-400'
        "
        @keypress="forceMajor"
        :disabledValue="lastOperationStatus == 2 ? true : false"
      />
      <StatusInput
        type="button"
        :value="t('status.restart')"
        :text="t('status.restart')"
        input-class="bg-white text-[#4f4e4e] font-bold"
        elmWidth="w-[15%]"
        :inputClass="
          lastOperationStatus == 2
            ? 'bg-gray-300 dark:bg-gray-500 dark:text-gray-400'
            : 'dark:bg-gray-700 dark:text-gray-400'
        "
        :disabledValue="lastOperationStatus == 2 ? true : false"
        data-modal-target="restart-order"
        data-modal-toggle="restart-order"
      />
    </div>
  </div>

  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
    <thead
      class="border-b text-gray-700 lowercase bg-white dark:bg-gray-700 dark:text-gray-400"
    >
      <tr>
        <th scope="col" class="px-6 py-4">{{ t("status.t_head.num") }}</th>
        <th scope="col" class="px-6 py-4">{{ t("status.t_head.order_id") }}</th>
        <th scope="col" class="px-6 py-4">
          {{ t("status.t_head.acceptance") }}
        </th>
        <th scope="col" class="px-6 py-4">
          {{ t("status.t_head.customer_name") }}
        </th>
        <th scope="col" class="px-6 py-4">
          {{ t("status.t_head.full_price") }}
        </th>
        <th scope="col" class="px-6 py-4">
          {{ t("status.t_head.prepayment") }}
        </th>
        <th scope="col" class="px-6 py-4">{{ t("status.t_head.comment") }}</th>
        <th scope="col" class="px-6 py-4">{{ t("status.t_head.status") }}</th>
        <th scope="col" class="px-6 py-4">{{ t("status.t_head.phone") }}</th>
        <th scope="col" class="px-6 py-4">{{ t("status.t_head.admin") }}</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(item, index) in operations"
        class="border-b text-gray-800 dark:border-gray-700"
        :class="
          item.status == 0
            ? 'bg-green-100 dark:bg-[#0e9f6f54]'
            : item.status == 1
            ? 'bg-orange-50 dark:bg-[#ffa51f38]'
            : 'bg-red-200 dark:bg-[#ff1a1e6e]'
        "
      >
        <td class="px-6 py-4 dark:text-gray-400">
          {{ index + 1 }}
        </td>
        <td class="px-6 py-4 text-blue-600 cursor-pointer dark:text-red-300">
          {{ order.order_unique_id }}
        </td>
        <td class="px-6 py-4 dark:text-gray-400">
          {{ item.createdAt.slice(0, 10) }} &nbsp;
          {{
            `${new Date(item.createdAt).getHours()}: ${new Date(
              item.createdAt
            ).getMinutes()}`
          }}
        </td>
        <td class="px-6 py-4 dark:text-gray-400">{{ order.full_name }}</td>
        <td class="px-6 py-4 dark:text-gray-400">{{ order.summa }}</td>
        <td class="px-6 py-4 dark:text-gray-400">
          {{ order.advance_payment }}
        </td>
        <td class="px-6 py-4 dark:text-gray-400">
          {{ order.description || "-" }}
        </td>
        <td class="px-6 py-4 dark:text-gray-400">
          {{
            item.status == 0
              ? t("status.t_body.status_1")
              : item.status == 1
              ? t("status.t_body.status_2")
              : t("status.t_body.status_3")
          }}
        </td>
        <td class="px-6 py-4 dark:text-gray-400">{{ order.phone_number }}</td>
        <td class="px-6 py-4 dark:text-gray-400">
          {{ item.admin.full_name }}
        </td>
      </tr>
    </tbody>
  </table>

  <div class="mt-12">
    <router-link to="/admin/order" class="inline-block">
      <button
        class="py-1 px-3 sm:py-2 sm:px-4 rounded-md border border-blue-600 hover:text-blue-600 hover:bg-transparent bg-blue-600 text-white duration-200 outline-none"
      >
        Check Order
      </button>
    </router-link>
  </div>

  <Modal
    modalId="waited-order"
    :textContent="t('modal.waiting')"
    :isChecked="passPending"
  />

  <Modal
    modalId="finished-order"
    :textContent="t('modal.finished')"
    :isChecked="passFinnished"
  />

  <Modal
    modalId="restart-order"
    :textContent="t('modal.restart')"
    :isChecked="restart"
  />
</template>

<style lang="css"></style>
