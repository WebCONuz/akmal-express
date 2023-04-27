import axios from "./axios";

const OperationService = {
  createOperation(data) {
    return axios.post(`/operation`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getByStatusOperation(value) {
    return axios.get(`/operation/search/status?status=${value}&page=1`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  deleteOperation(id) {
    return axios.delete(`/operation/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default OperationService;
