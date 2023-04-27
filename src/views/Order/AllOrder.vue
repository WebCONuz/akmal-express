<script setup>
import AllOrder from "../../components/AllOrder/AllOrderList.vue";
import Text from "../../ui/Text.vue";
import { ref, onMounted } from "vue";
import useOrderStore from "@/stores/orderStore";
import { useI18n } from "vue-i18n";
import Paginate from "vuejs-paginate-next";

const { t, locale } = useI18n({ useScope: "global" });
const orderStore = useOrderStore();

// States for Store
const orders = ref([]);
const full_name = ref("");
const orderID = ref("");
const orderStatus = ref();
const date = ref();

// States for Pagination
const totalPages = ref(0);
const currentPage = ref(1);
let PaginationFunction;

// Make time template: 04-15-2023
const makeTime = (date, i = 0) => {
  let year = new Date(date).getFullYear();
  let t1 = new Date(date).getMonth() + 1;
  let t2 = new Date(date).getDate();

  const month = t1 < 10 ? "0" + t1 : t1;
  const day = t2 < 10 ? "0" + (t2 + i) : t2 + i;
  return month + "-" + day + "-" + year;
};

// Get All Orders
const getOrders = async () => {
  await orderStore.getAll(currentPage.value);
  currentPage.value = orderStore.currentPage;
  totalPages.value = orderStore.totalPages;
  orders.value = orderStore.orders;
};

// Get Orders by searchName
const searchByName = () => {
  currentPage.value = 1;
  PaginationFunction = async () => {
    if (full_name.value !== "") {
      await orderStore.getByName(full_name.value, currentPage.value);
      totalPages.value = orderStore.totalPages;
      orders.value = orderStore.orders;
    } else {
      getOrders();
    }
  };
  PaginationFunction();
};

// Get Orders by searchUniqueId
const searchByUniqueId = async () => {
  totalPages.value = 1;
  if (orderID.value !== "") {
    await orderStore.getByUniqueId(orderID.value.toUpperCase());
    orders.value = orderStore.orders;
  } else {
    getOrders();
  }
};

// Get Orders by searchDate
const setDate = async (value) => {
  if (value) {
    date.value = value;
    let from = makeTime(date.value[0]);
    let to = makeTime(date.value[1], 1);
    console.log({ from, to });

    if (from && to) {
      currentPage.value = 1;
      PaginationFunction = async () => {
        await orderStore.getByDate(
          {
            from,
            to,
          },
          currentPage.value
        );
        totalPages.value = orderStore.totalPages;
        orders.value = orderStore.orders;
        console.log(orders.value);
      };
      PaginationFunction();
    } else {
      getOrders();
      PaginationFunction = getOrders;
    }
  }
};

// Get Orders by searchStatus
const searchByStatus = async () => {
  if (orderStatus.value == 3) {
    getOrders();
    PaginationFunction = getOrders;
  } else {
    currentPage.value = 1;
    PaginationFunction = async () => {
      await orderStore.getByStatus(orderStatus.value, currentPage.value);
      totalPages.value = Math.ceil(orderStore.orders.length / 10);
      // orders.value = orderStore.orders;
      let n = (currentPage.value - 1) * 10;
      let m = n + 10;
      const currentOrders = orderStore.orders.slice(n, m);
      orders.value = currentOrders;
    };
    PaginationFunction();
  }
};

// Mounted APP
onMounted(() => {
  getOrders();
  PaginationFunction = getOrders;
});
</script>

<template>
  <div>
    <section class="py-4 my-6">
      <Text :text="t('orders.title')" class="mb-4" />
      <div class="flex items-center justify-between">
        <div class="w-[24%]">
          <label for="customer" class="">
            <p class="mb-4">{{ t("orders.customer") }}</p>
            <input
              type="text"
              id="customer"
              placeholder="Enter Costumer Name"
              class="w-full h-[50px] border border-[#aaaaaa] outline-none rounded-[3px] dark:bg-gray-700 dark:text-white"
              v-model="full_name"
              @input="searchByName"
            />
          </label>
        </div>
        <div class="w-[24%]">
          <label for="Order_ID" class="">
            <p class="mb-4">{{ t("orders.order_id") }}</p>
            <input
              type="text"
              id="Order_ID"
              placeholder="Enter Invoice ID"
              class="w-full h-[50px] border border-[#aaaaaa] outline-none rounded-[3px] dark:bg-gray-700 dark:text-white"
              v-model="orderID"
              @input="searchByUniqueId"
            />
          </label>
        </div>
        <div class="w-[24%]">
          <p class="mb-4">{{ t("orders.from_do") }}</p>
          <VueDatePicker
            range
            class="data-picker"
            :model-value="date"
            @update:model-value="setDate"
          />
        </div>
        <div class="w-[24%]">
          <label for="Order_Status" class="">
            <p class="mb-4">{{ t("orders.status") }}</p>
            <select
              id="Order_Status"
              v-model="orderStatus"
              @change="searchByStatus"
              class="w-full h-[50px] border outline-none border-[#aaaaaa] text-gray-900 text-sm rounded-[3px] focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="3">{{ t("orders.status_options.all") }}</option>
              <option value="0">{{ t("orders.status_options.new") }}</option>
              <option value="1">{{ t("orders.status_options.waited") }}</option>
              <option value="2">
                {{ t("orders.status_options.finished") }}
              </option>
            </select>
          </label>
        </div>
      </div>
    </section>
  </div>

  <AllOrder :orders="orders" :pageNum="+currentPage" />

  <Paginate
    v-if="totalPages > 1"
    :page-count="totalPages"
    :page-range="3"
    :margin-pages="2"
    :click-handler="PaginationFunction"
    :prev-text="'<'"
    :next-text="'>'"
    :container-class="'pagination'"
    :page-class="'page-item'"
    v-model="currentPage"
  >
  </Paginate>
</template>

<style>
.pagination {
  display: flex;
  justify-content: center;
  padding: 1.5rem 0 1rem 0;
}
.page-item {
  margin: 0 2px;
  cursor: pointer;
}
.page-item .page-link {
  border-radius: 4px;
  padding: 6px 14px;
  border: 1px solid rgba(3, 201, 92, 0.634);
  background-color: rgba(0, 128, 0, 0.068);
  cursor: pointer;
}
.page-item.active .page-link {
  border: 1px solid rgba(3, 201, 92, 0.804);
  background-color: rgba(0, 128, 0, 0.162);
}
.page-item.disabled .page-link {
  border: 1px solid #3333335e;
  background-color: #33333338;
}
</style>
