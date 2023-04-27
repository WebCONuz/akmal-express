<script setup>
import InputSearch from "../../ui/InputSearch.vue";
import Man from "../../assets/images/man.jpg";

const username = localStorage.getItem("username");
</script>

<template>
  <div>
    <header class="flex items-center justify-between py-2">
      <InputSearch />

      <div class="flex items-center gap-5">
        <p class="text-xl font-medium mr-1 capitalize">{{ username }}</p>
        <img :src="Man" alt="" class="w-[55px] rounded-[10px]" />
        <div
          class="relative w-[55px] h-[55px] flex items-center justify-center rounded-[3px] bg-white dark:bg-gray-700"
        >
          <div
            class="bg-[#FFBC0F] w-[10px] h-[10px] rounded-full absolute -top-1 -right-1"
          ></div>
          <i class="bx bx-bell text-[#ADA7A7] text-2xl"></i>
        </div>
      </div>
    </header>
  </div>
</template>

<style lang="css"></style>
