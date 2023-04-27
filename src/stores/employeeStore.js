import { defineStore } from "pinia";
import { ref } from "vue";
import EmployeeService from "../service/employee";

const useEmployeeStore = defineStore("employee", () => {
  const employeeData = ref({});
  const employees = ref([]);

  const create = async (data) => {
    try {
      const response = await EmployeeService.createEmployee(data);
      if (response.status === 201) {
        employeeData.value = response.data;
        return true;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const activate = async (data) => {
    try {
      const response = await EmployeeService.activateEmployee(data);
      if (response.status === 201) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async () => {
    try {
      const response = await EmployeeService.getAllEmployees();
      if (response.status === 200) {
        employees.value = response.data.records;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { employeeData, employees, create, getAll, activate };
});

export default useEmployeeStore;
