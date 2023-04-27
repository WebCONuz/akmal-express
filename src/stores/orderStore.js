import { defineStore } from "pinia";
import { ref } from "vue";
import OrderService from "../service/order";
import OperationService from "../service/operation";

const useOrderStore = defineStore("order", () => {
  const order = ref([]);
  const orders = ref([]);
  const totalPages = ref();
  const currentPage = ref();
  const totalCount = ref();
  const statisticData = ref([]);
  const orderCount = ref(0);

  const create = async (data) => {
    try {
      const res1 = await OrderService.createOrder(data);
      if (res1.status === 201) {
        await OperationService.createOperation({
          status: "0",
          order_id: +res1.data.id,
          admin_id: +localStorage.getItem("id"),
        });
        return true;
      } else {
        console.log(res1.data.response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAll = async (pageNumber) => {
    try {
      const response = await OrderService.getAllOrders(pageNumber);
      if (response.status === 200) {
        // sahifalar soni: Paginatsiya uchun
        totalPages.value = response.data.pagination.totalPages;
        // joriy sahifa nomeri: Paginatsiya uchun
        currentPage.value = response.data.pagination.currentPage;
        // orderlar soni: Statistika uchun
        totalCount.value = response.data.pagination.totalCount;
        // Joriy sahifadagi orderlar
        orders.value = response.data.records;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getOne = async (id) => {
    try {
      const response = await OrderService.getOneOrder(id);
      if (response.status === 200) {
        order.value = response.data;
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getByName = async (customer, pageNumber) => {
    try {
      const response = await OrderService.getByNameOrders(customer, pageNumber);
      if (response.status === 200) {
        // sahifalar soni: Paginatsiya uchun
        totalPages.value = response.data.pagination.totalPages;
        // Joriy sahifadagi orderlar: Data
        orders.value = response.data.records;
      } else {
        console.log(response);
      }
    } catch (err) {
      orders.value = [];
      console.log(err);
    }
  };

  const getByUniqueId = async (orderID) => {
    try {
      const response = await OrderService.getByUniqueIdOrders(orderID);
      if (response.status === 200) {
        orders.value = response.data;
        return true;
      } else {
        console.log(response);
      }
    } catch (err) {
      orders.value = [];
      console.log(err);
    }
  };

  const getByDate = async (data, pageNumber) => {
    try {
      const response = await OrderService.getByDateOrders(data, pageNumber);
      if (response.status === 201) {
        // sahifalar soni: Paginatsiya uchun
        totalPages.value = response.data.pagination.totalPages;
        // Joriy sahifadagi orderlar: Data
        console.log("Data11", response.data.records);
        orders.value = response.data.records;
      } else {
        console.log("Error", response);
      }
    } catch (err) {
      orders.value = [];
      console.log(err);
    }
  };

  const getByStatus = async (status, pageNumber) => {
    try {
      const response = await OrderService.getByStatusOrders(status, pageNumber);
      if (response.status === 200) {
        // sahifalar soni: Paginatsiya uchun
        totalPages.value = response.data.pagination.totalPages;
        // Joriy sahifadagi orderlar: Data
        orders.value = response.data.records;
        // Orderlarning umumiy soni
        orderCount.value = response.data.records.length;
      } else {
        console.log(response);
      }
    } catch (err) {
      orders.value = [];
      console.log(err);
    }
  };

  const updateOrder = async (id, data) => {
    try {
      const response = await OrderService.patchOrders(id, data);
      if (response.status === 200) {
        console.log("Added description");
        return true;
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const statistic = async (date) => {
    try {
      const response = await OrderService.statistic(date);
      if (response.status === 200) {
        statisticData.value = response.data;
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getByUniqueIdUser = async (orderID) => {
    try {
      const response = await OrderService.getByUniqueIdOrdersUser(orderID);
      if (response.status === 200) {
        return response.data;
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    orders,
    order,
    totalPages,
    currentPage,
    totalCount,
    statisticData,
    orderCount,
    create,
    getAll,
    getOne,
    getByName,
    getByUniqueId,
    getByDate,
    getByStatus,
    updateOrder,
    statistic,
    getByUniqueIdUser,
  };
});

export default useOrderStore;
