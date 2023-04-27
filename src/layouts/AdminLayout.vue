<script setup>
import Sidebar from "../components/Sidebar/Sidebar.vue";
import Header from "../components/Header/Header.vue";
</script>

<template>
  <main class="flex">
    <div class="w-[18%]">
      <Sidebar />
    </div>
    <section class="bg-img w-[82%] px-4 py-4 overflow-y-scroll h-screen">
      <Header />
      <router-view></router-view>
    </section>
  </main>
</template>

<style scoped>
.bg-img {
  background-image: url("../assets/images/user-map-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
