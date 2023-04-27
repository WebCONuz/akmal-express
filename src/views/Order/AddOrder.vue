<script setup>
import AllOrder from "../../components/AllOrder/AllOrderList.vue";
import Text from "@/ui/Text.vue";
import Button from "@/ui/Button.vue";
import TextWithInput from "@/ui/TextWithInput.vue";
import { reactive, ref, onMounted } from "vue";
import useOrderStore from "@/stores/orderStore";
import { useI18n } from "vue-i18n";
import Paginate from "vuejs-paginate-next";
import { toast } from "vue3-toastify";

const { t, locale } = useI18n({ useScope: "global" });
const orderStore = useOrderStore();
const orders = ref([]);

// States for Pagination
const totalPages = ref(0);
const currentPage = ref(1);
let PaginationFunction;

const getOrders = async () => {
  await orderStore.getAll(currentPage.value);
  currentPage.value = orderStore.currentPage;
  totalPages.value = orderStore.totalPages;
  orders.value = orderStore.orders;
};

let orderInfo = reactive({
  full_name: "",
  phone_number: "",
  product_link: "",
  summa: "",
  advance_payment: "",
});

const addOrder = async () => {
  let tell1 = /^998[389][012345789][0-9]{7}$/;
  let tell2 = /^[389][012345789][0-9]{7}$/;
  let tell3 = /^\+998\d{9}$/;
  if (
    tell1.test(orderInfo.phone_number) ||
    tell2.test(orderInfo.phone_number) ||
    tell3.test(orderInfo.phone_number)
  ) {
    const data = {
      full_name: orderInfo.full_name,
      phone_number: orderInfo.phone_number,
      product_link: orderInfo.product_link,
      summa: +orderInfo.summa,
      advance_payment: +orderInfo.advance_payment,
    };

    const res = await orderStore.create(data);
    if (res) {
      toast.success(t("toasts.order.success"));
    } else {
      toast.error(t("toasts.order.error"));
    }
    orderInfo.full_name = "";
    orderInfo.phone_number = "";
    orderInfo.product_link = "";
    orderInfo.summa = "";
    orderInfo.advance_payment = "";
  } else {
    toast.error(t("toasts.order.phone"));
  }

  getOrders();
  PaginationFunction = getOrders;
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
      <Text :text="t('newOrder.title')" class="mb-4" />
      <form @submit.prevent="addOrder">
        <div class="flex flex-wrap items-end justify-between">
          <TextWithInput
            :text="t('newOrder.customer')"
            placeholder="John Doe"
            inputID="costumerName"
            class="mb-4"
            :send="orderInfo.full_name"
            @getDataFromInput="(newValue) => (orderInfo.full_name = newValue)"
          />
          <TextWithInput
            :text="t('newOrder.phone')"
            type="text"
            placeholder="+998995426307"
            inputID="phoneNumber"
            class="mb-4"
            :send="orderInfo.phone_number"
            @getDataFromInput="
              (newValue) => (orderInfo.phone_number = newValue)
            "
          />
          <TextWithInput
            :text="t('newOrder.link')"
            type="text"
            placeholder="https://..."
            inputID="orderLink"
            class="mb-4"
            :send="orderInfo.product_link"
            @getDataFromInput="
              (newValue) => (orderInfo.product_link = newValue)
            "
          />
          <TextWithInput
            :text="t('newOrder.price')"
            type="text"
            placeholder="Enter product price"
            inputID="orderPrice"
            class="mb-4"
            :send="orderInfo.summa"
            @getDataFromInput="(newValue) => (orderInfo.summa = newValue)"
          />
          <TextWithInput
            :text="t('newOrder.prepayment')"
            type="text"
            placeholder="Enter start amount"
            inputID="orderStartAmount"
            :send="orderInfo.advance_payment"
            @getDataFromInput="
              (newValue) => (orderInfo.advance_payment = newValue)
            "
          />
          <Button
            type="submit"
            :text="t('newOrder.button')"
            class="bg-[#0B63F8] rounded-[3px] text-white font-semibold"
          />
        </div>
      </form>
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
