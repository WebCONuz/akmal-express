<script setup>
import OrderRow from "../../ui/OrderRow.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });

const props = defineProps({
  orders: {
    required: true,
    type: Object,
  },
  pageNum: Number,
});

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
</script>

<template>
  <div class="flex justify-end mb-8">
    <div
      class="bg-green-100 border dark:bg-green-900 border-green-400 py-3 px-6 rounded-md"
    >
      {{ t("orders.day.day1") }}
    </div>
    <div
      class="bg-orange-50 border dark:bg-orange-800 border-orange-400 py-3 px-6 rounded-md mx-2"
    >
      {{ t("orders.day.day2") }}
    </div>
    <div
      class="bg-red-200 border dark:bg-red-900 border-red-400 py-3 px-6 rounded-md"
    >
      {{ t("orders.day.day3") }}
    </div>
  </div>
  <div class="relative overflow-x-auto">
    <table
      v-if="orders.length"
      class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
    >
      <thead
        class="border-b text-gray-700 lowercase bg-white dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-4">{{ t("newOrder.t_head.num") }}</th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.order_id") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.acceptance") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.customer_name") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.link") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.full_price") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.prepayment") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.status") }}
          </th>
          <th scope="col" class="px-6 py-4">
            {{ t("newOrder.t_head.phone") }}
          </th>
        </tr>
      </thead>
      <tbody>
        <OrderRow
          v-for="(item, index) in props.orders"
          :name="item.full_name"
          :uniqueID="item.order_unique_id"
          :date="item.createdAt"
          :sum="item.summa"
          :advence="item.advance_payment"
          :num="(pageNum - 1) * 10 + index + 1"
          :ID="item.id"
          :link="item.product_link"
          :phone="item.phone_number"
          :status="item.status ? +item.status : +lastOperation(item.operation)"
        />
      </tbody>
    </table>
    <h2 v-else class="text-center text-2xl text-red-500">
      Buyurtmalar mavjud emas!
    </h2>
  </div>
</template>

<script></script>
