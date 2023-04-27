<script setup>
import Employee from "../../components/Employee/EmployeeList.vue";
import Text from "@/ui/Text.vue";
import Button from "@/ui/Button.vue";
import TextWithInput from "@/ui/TextWithInput.vue";

import { reactive, ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { toast } from "vue3-toastify";
import useEmployeeStore from "@/stores/employeeStore";

const { t, locale } = useI18n({ useScope: "global" });
const employeeStore = useEmployeeStore();
const employees = ref([]);

const getEmployees = async () => {
  await employeeStore.getAll();
  employees.value = employeeStore.employees;
};

let employeeInfo = reactive({
  full_name: "",
  user_name: "",
  hashed_password: "",
});

const addEmployee = async () => {
  const res = await employeeStore.create(employeeInfo);
  employeeInfo.full_name = "";
  employeeInfo.user_name = "";
  employeeInfo.hashed_password = "";
  if (res) {
    toast.success(t("toasts.epmloyee.success"));
  } else {
    toast.error(t("toasts.epmloyee.error"));
  }

  getEmployees();
};

const activateEmployee = async (obj) => {
  await employeeStore.activate(obj);
  getEmployees();
};

onMounted(() => {
  getEmployees();
});
</script>

<template>
  <div>
    <section class="py-4 my-6">
      <Text :text="t('addUser.t_head.title')" class="mb-4" />
      <form @submit.prevent="addEmployee">
        <div class="flex items-end justify-between">
          <TextWithInput
            :text="t('addUser.t_head.full_name')"
            placeholder="Enter admin name"
            inputID="workerFullName"
            :send="employeeInfo.full_name"
            @getDataFromInput="
              (newValue) => (employeeInfo.full_name = newValue)
            "
          />
          <TextWithInput
            :text="t('addUser.t_head.username')"
            type="text"
            placeholder="Enter username"
            inputID="workerUserName"
            :send="employeeInfo.user_name"
            @getDataFromInput="
              (newValue) => (employeeInfo.user_name = newValue)
            "
          />
          <TextWithInput
            :text="t('addUser.t_head.password')"
            type="password"
            placeholder="********"
            inputID="workerPassword"
            :send="employeeInfo.hashed_password"
            @getDataFromInput="
              (newValue) => (employeeInfo.hashed_password = newValue)
            "
          />
          <Button
            type="submit"
            :text="t('addUser.t_head.button')"
            class="bg-[#0B63F8] rounded-[3px] text-white font-semibold"
          />
        </div>
      </form>
    </section>
  </div>

  <Employee :activate="activateEmployee" :data="employees" />
</template>
