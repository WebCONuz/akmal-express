<script setup>
import Chart from "../../components/Chart/Chart.vue";
import useOrderStroe from "../../stores/orderStore";
import useEmployeeStore from "@/stores/employeeStore";
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n({ useScope: "global" });

const employeeStore = useEmployeeStore();

const orderStore = useOrderStroe();
const statisticData = ref([]);
const date1 = ref("");

const orderLength = ref(0);
const orderDone = ref(0);
const orderContinued = ref(0);
const employees = ref(0);

const getEmployees = async () => {
  await employeeStore.getAll();
  employees.value = employeeStore.employees.length;
};

const getAllOrders = async () => {
  await orderStore.getAll(1);
  orderLength.value = orderStore.totalCount;
};

const getContinuedOrders = async () => {
  await orderStore.getByStatus(1, 1);
  orderContinued.value = orderStore.orderCount;
};

const getFinishedOrders = async () => {
  await orderStore.getByStatus(2, 1);
  orderDone.value = orderStore.orderCount;
};

const makeTime = (date) => {
  let year = new Date(date).getFullYear();
  let t1 = new Date(date).getMonth() + 1;
  let t2 = new Date(date).getDate();

  const month = t1 < 10 ? "0" + t1 : t1;
  const day = t2 < 10 ? "0" + (t2 + 1) : t2 + 1;
  return month + "-" + day + "-" + year;
};

const statistika = async (time) => {
  await orderStore.statistic(time);
  statisticData.value = orderStore.statisticData;
};

function onChange() {
  const time = makeTime(date1.value);
  statistika(time);
}

onMounted(() => {
  const t = new Date();
  const t2 = makeTime(t);
  statistika(t2);
  getAllOrders();
  getContinuedOrders();
  getFinishedOrders();
  getEmployees();
});
</script>

<template>
  <h1
    class="text-center text-blue-600 dark:text-blue-400 font-medium text-2xl mt-8 mb-6"
  >
    {{ t("dashboard.title") }}
  </h1>
  <section id="statistic-data" class="flex justify-between mb-8">
    <div
      class="bg-white dark:bg-gray-700 py-6 px-2 rounded-md border border-gray-300 text-center"
      :class="employees > 0 ? 'w-[24%]' : 'w-[32%]'"
    >
      <h2 class="text-3xl mb-2 font-bold text-blue-500">
        {{ orderLength || 0 }}
      </h2>
      <p class="text-lg capitalize">{{ t("dashboard.stat1") }}</p>
    </div>
    <div
      class="bg-white dark:bg-gray-700 py-6 px-2 rounded-md border border-gray-300 text-center"
      :class="employees > 0 ? 'w-[24%]' : 'w-[32%]'"
    >
      <h2 class="text-3xl mb-2 font-bold text-green-500">
        {{ orderDone || 0 }}
      </h2>
      <p class="text-lg capitalize">{{ t("dashboard.stat2") }}</p>
    </div>
    <div
      class="bg-white dark:bg-gray-700 py-6 px-2 rounded-md border border-gray-300 text-center"
      :class="employees > 0 ? 'w-[24%]' : 'w-[32%]'"
    >
      <h2 class="text-3xl mb-2 font-bold text-yellow-400">
        {{ orderContinued || 0 }}
      </h2>
      <p class="text-lg capitalize">{{ t("dashboard.stat3") }}</p>
    </div>
    <div
      v-if="employees"
      class="bg-white dark:bg-gray-700 py-6 px-2 rounded-md border border-gray-300 text-center w-[24%]"
    >
      <h2 class="text-3xl mb-2 font-bold text-gray-500 dark:text-gray-400">
        {{ employees }}
      </h2>
      <p class="text-lg capitalize">{{ t("dashboard.stat4") }}</p>
    </div>
  </section>
  <label for="start_date" class="p-10">
    <p class="pb-2">{{ t("dashboard.label") }}</p>
    <VueDatePicker
      v-model="date1"
      @update:model-value="onChange"
      :enable-time-picker="false"
      class="w-[300px] data_picker dark:bg-transparent"
    />
  </label>
  <Chart :result="statisticData" class="dark:border-white" />
</template>
