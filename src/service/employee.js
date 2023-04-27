import axios from "./axios";

const EmployeeService = {
  createEmployee(data) {
    return axios.post(`/admin`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  activateEmployee(data) {
    return axios.post(`/admin/activete`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getAllEmployees() {
    return axios.get("/admin/search/all?page=1", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default EmployeeService;
