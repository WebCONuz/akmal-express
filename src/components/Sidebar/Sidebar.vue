<script setup>
import { useRouter } from "vue-router";
import { initFlowbite } from "flowbite";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";

import DropDown from "../../ui/DropDown.vue";
import Modal from "../../ui/Modal.vue";

const { t, locale } = useI18n({ useScope: "global" });
const router = useRouter();
const role = localStorage.getItem("role");

const logout = async (val) => {
  if (val) {
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    router.push("/");
  }
};

onMounted(() => {
  initFlowbite();
});
</script>

<template>
  <div
    class="bg-white h-screen border flex flex-col justify-between py-10 dark:bg-gray-700"
  >
    <div class="menu-top">
      <h2
        class="text-[22px] font-medium leading-[36px] text-[#0167c6] text-center pb-7 dark:text-red-300"
      >
        A-EXPRESS.UZ
      </h2>
      <ul>
        <router-link to="/admin/dashboard">
          <li
            class="text-[16px] leading-6 pl-[25px] hover:text-[#0B63F8] mb-[20px] text-[#131313] border-l-4 border-white hover:border-l-[#0B63F8] duration-200 dark:text-white dark:hover:text-red-300 dark:hover:border-l-red-300 dark:border-gray-700"
          >
            <i class="bx bxs-dashboard mr-[15px] text-xl"></i>
            {{ t("sidebar.dashboard") }}
          </li>
        </router-link>
        <router-link to="/admin/employee" v-if="role == 1">
          <li
            class="text-[16px] leading-6 pl-[25px] hover:text-[#0B63F8] mb-[20px] text-[#131313] border-l-4 border-white hover:border-l-[#0B63F8] duration-200 dark:text-white dark:hover:text-red-300 dark:hover:border-l-red-300 dark:border-gray-700"
          >
            <i class="bx bx-user-plus mr-[15px] text-xl"></i>
            {{ t("sidebar.addUser") }}
          </li>
        </router-link>
        <router-link to="/admin/order/add">
          <li
            class="text-[16px] leading-6 pl-[25px] hover:text-[#0B63F8] mb-[20px] text-[#131313] border-l-4 border-white hover:border-l-[#0B63F8] duration-200 dark:text-white dark:hover:text-red-300 dark:hover:border-l-red-300 dark:border-gray-700"
          >
            <i class="bx bx-cart-add mr-[15px] text-xl"></i>
            {{ t("sidebar.newOrder") }}
          </li>
        </router-link>
        <router-link to="/admin/order">
          <li
            class="text-[16px] leading-6 pl-[25px] hover:text-[#0B63F8] mb-[20px] text-[#131313] border-l-4 border-white hover:border-l-[#0B63F8] duration-200 dark:text-white dark:hover:text-red-300 dark:hover:border-l-red-300 dark:border-gray-700"
          >
            <i class="bx bx-cart mr-[15px] text-xl"></i>
            {{ t("sidebar.orders") }}
          </li>
        </router-link>
        <li
          class="text-[16px] leading-6 pl-[25px] hover:text-[#0B63F8] mb-[20px] text-[#131313] border-l-4 border-white hover:border-l-[#0B63F8] duration-200 dark:text-white dark:hover:text-red-300 dark:hover:border-l-red-300 dark:border-gray-700"
        >
          <DropDown />
        </li>
      </ul>
    </div>
    <div class="menu-bottom">
      <a class="block mb-5" href="https://t.me/akex2">
        <div
          class="text-[16px] leading-6 pl-[25px] hover:text-[#0B63F8] mb-[10px] text-[#131313] duration-200 dark:text-white dark:hover:text-red-300 dark:border-gray-700"
        >
          <i class="bx bx-help-circle text-xl mr-[15px]"></i>
          {{ t("sidebar.help") }}
        </div>
      </a>
      <div
        data-modal-target="logout-modal"
        data-modal-toggle="logout-modal"
        class="py-1 text-sm w-[65%] flex items-center justify-center cursor-pointer ml-[25px] rounded-[30px] hover:text-white hover:bg-[#131313aa] text-[#131313aa] border border-[#131313aa] hover:border-[#131313aa] duration-200 dark:border-white dark:text-white dark:hover:border-[#131313aa]"
      >
        <i class="bx bx-log-out text-xl mr-[15px]"></i>
        <span>{{ t("sidebar.logout") }}</span>
      </div>
      <Modal
        modalId="logout-modal"
        :textContent="t('modal.logout')"
        :isChecked="logout"
      />
    </div>
  </div>
</template>

<style scoped>
.router-link-active li {
  color: #0b63f8;
  border-left-color: #0b63f8;
}
</style>
