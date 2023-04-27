import axios from "axios";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.baseURL = "http://146.190.207.16:5050";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("token");

export default axios;
