<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import useAuthStore from "../../stores/authStroe";

const authStore = useAuthStore();
const router = useRouter();

const loginInfo = reactive({
  username: "",
  password: "",
});

const login = async () => {
  await authStore.login(loginInfo);
  if (localStorage.getItem("token")) {
    router.push("admin/dashboard");
  } else {
    router.push("/");
  }
};

if (localStorage.getItem("token")) {
  router.push("admin/dashboard");
}
</script>

<template>
  <div
    class="login-employee w-screen h-screen bg-white dark:bg-gray-900 flex items-center justify-center relative"
  >
    <div
      class="w-[96%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] 2xl:w-[30%]"
    >
      <h1 class="text-[#4763E4] text-center font-bold text-[30px]">
        ADMIN DASHBOARD
      </h1>
      <div class="wrapper">
        <div class="username w-full mt-4">
          <h3 class="text-[16px] mb-2">Enter Username</h3>
          <input
            type="text"
            placeholder="Enter Username"
            class="w-full rounded-lg dark:text-gray-200 dark:bg-gray-900"
            v-model="loginInfo.username"
          />
        </div>
        <div class="password w-full mt-4">
          <h3 class="text-[16px] mb-2">Enter user password</h3>
          <input
            type="text"
            placeholder="Enter user password"
            class="w-full rounded-lg dark:text-gray-200 dark:bg-gray-900"
            v-model="loginInfo.password"
          />
        </div>
        <div class="wrap_btn w-full mt-4 text-center">
          <button
            @click="login"
            class="btn text-center mb-2 w-full duration-200 bg-[#4763E4] text-white rounded-lg text-[18px] py-2 px-1 hover:bg-white dark:hover:bg-gray-200 hover:text-[#4763E4] hover:border hover:border-[#4753E4]"
          >
            Kirish
          </button>
          <a href="https://t.me/akex2" class="text-[#5C73DB]"
            >muammo bo'yicha murojaat</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.login-employee {
  background-image: url("../../assets/images/user-map-bg.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
