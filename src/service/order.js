import axios from "./axios";

const OrderService = {
  createOrder(data) {
    return axios.post(`/order`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getAllOrders(pageNumber) {
    return axios.get(`/order/search/all?page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getOneOrder(id) {
    return axios.get(`/order/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getByNameOrders(name, pageNumber) {
    return axios.get(`/order/search/byname?name=${name}&page=${pageNumber}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getByUniqueIdOrders(id) {
    return axios.get(`/order/search/byuniqueid?id=${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getByStatusOrders(status, pageNumber) {
    return axios.get(
      `/order/search/bystatus?status=${status}&page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  },

  getByDateOrders(data, pageNumber) {
    return axios.post(`/order/search/bydate?page=${pageNumber}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  },

  patchOrders(id, data) {
    return axios.patch(`/order/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  },

  statistic(date) {
    return axios.get(`/order/statistika/${date}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  },

  getByUniqueIdOrdersUser(id) {
    return axios.get(`/order/search/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default OrderService;
