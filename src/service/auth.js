import axios from "./axios";

const AuthService = {
  loginUser(admin) {
    return axios.post("/auth/signin", admin);
  },
};

export default AuthService;
