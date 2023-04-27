<script setup>
import Text from "../../ui/Text.vue";
import Button from "../../ui/Button.vue";
import TextWithInput from "../../ui/TextWithInput.vue";
import { reactive } from "vue";
import useOrderStore from "../../stores/orderStore";

const orderStore = useOrderStore();

let orderInfo = reactive({
  full_name: "",
  phone_number: "",
  product_link: "",
  summa: "",
  advance_payment: "",
});

const addOrder = async () => {
  const data = {
    full_name: orderInfo.full_name,
    phone_number: orderInfo.phone_number,
    product_link: orderInfo.product_link,
    summa: +orderInfo.summa,
    advance_payment: +orderInfo.advance_payment,
  };
  await orderStore.create(data);
  orderInfo.full_name = "";
  orderInfo.phone_number = "";
  orderInfo.product_link = "";
  orderInfo.summa = "";
  orderInfo.advance_payment = "";
};
</script>

<template>
  <div>
    <section class="py-4 my-6">
      <Text text="Yangi buyurtma qo’shish" class="mb-4" />
      <form @submit.prevent="addOrder">
        <div class="flex flex-wrap items-end justify-between">
          <TextWithInput
            text="Buyurtmachi"
            placeholder="Enter Costumer Name"
            inputID="costumerName"
            class="mb-4"
            :send="orderInfo.full_name"
            @getDataFromInput="(newValue) => (orderInfo.full_name = newValue)"
          />
          <div>{{ full_name }}</div>
          <TextWithInput
            text="telefon raqami"
            type="text"
            placeholder="Enter phone number"
            inputID="phoneNumber"
            class="mb-4"
            :send="orderInfo.phone_number"
            @getDataFromInput="
              (newValue) => (orderInfo.phone_number = newValue)
            "
          />
          <TextWithInput
            text="mahsulot linki"
            type="text"
            placeholder="https://"
            inputID="orderLink"
            class="mb-4"
            :send="orderInfo.product_link"
            @getDataFromInput="
              (newValue) => (orderInfo.product_link = newValue)
            "
          />
          <TextWithInput
            text="mahsulot (narxi)"
            type="text"
            placeholder="Enter product price"
            inputID="orderPrice"
            class="mb-4"
            :send="orderInfo.summa"
            @getDataFromInput="(newValue) => (orderInfo.summa = newValue)"
          />
          <TextWithInput
            text="oldindan to’lov"
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
            text="qo'shish"
            class="bg-[#0B63F8] rounded-[3px] text-white font-semibold"
          />
        </div>
      </form>
    </section>
  </div>
</template>

<style lang="css"></style>
