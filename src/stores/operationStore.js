import { defineStore } from "pinia";
import { ref } from "vue";
import OperationService from "../service/operation";

const useOperationStore = defineStore("operation", () => {
  const operations = ref();
  const orders = ref();

  const create = async (data) => {
    const response = await OperationService.createOperation(data);
    if (response.status === 201) {
      operations.value = response.data;
      return true;
    } else {
      console.log(response);
    }
  };

  const getByStatus = async (status) => {
    const response = await OperationService.getByStatusOperation(status);
    if (response.status === 200) {
      let orderArray = [];
      response.data.records.forEach((item) => {
        orderArray.push({ status: item.status, ...item.order });
      });
      orders.value = orderArray;
    } else {
      console.log(response);
    }
  };

  const deleteOperation = async (id) => {
    const response = await OperationService.deleteOperation(id);
    if (response.status === 200) {
      create({
        status: "0",
        order_id: +id,
        admin_id: +localStorage.getItem("id"),
      });

      return true;
    } else {
      console.log(response);
    }
  };

  return { operations, orders, getByStatus, create, deleteOperation };
});

export default useOperationStore;
