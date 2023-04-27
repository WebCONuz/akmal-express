import { defineStore } from "pinia";
import AuthService from "../service/auth";

const useAuthStore = defineStore("auth", () => {
  const login = async (data) => {
    const response = await AuthService.loginUser(data);
    if (response.status === 201) {
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("role", response.data.is_creator ? 1 : 2);
      localStorage.setItem("username", response.data.user_name);
      localStorage.setItem("id", response.data.id);
    } else {
      console.log(response);
    }
  };

  return { login };
});

export default useAuthStore;
