import { createRouter, createWebHistory } from "vue-router";
import AllOrder from "../views/Order/AllOrder.vue";
import AddOrder from "../views/Order/AddOrder.vue";
import ChartOrder from "../views/Order/ChartOrder.vue";
import StatusOrder from "../views/Order/StatusOrder.vue";
import Employee from "../views/Employee/Employee.vue";

import AdminLayout from "../layouts/AdminLayout.vue";
import LoginAdmin from "../layouts/LoginAdmin.vue";
import NotFound from "../layouts/NotFound.vue";

import { toast } from "vue3-toastify";

// Routing
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginAdmin,
    },
    {
      path: "/admin",
      component: AdminLayout,
      children: [
        {
          path: "dashboard",
          component: ChartOrder,
        },
        {
          path: "order",
          component: AllOrder,
        },
        {
          path: "employee",
          component: Employee,
        },
        {
          path: "order/add",
          component: AddOrder,
        },
        {
          path: "order/:id",
          component: StatusOrder,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: NotFound,
    },
  ],
});

// Check Token
import axios from "@/Service/axios";
router.beforeEach(async (to, from) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const result = await axios.post("/admin/check-token", { token });
      if (result?.data?.isValid) {
        localStorage.setItem("id", result.data.data.id);
        localStorage.setItem("role", result.data.data.is_creator ? 1 : 2);
        localStorage.setItem("username", result.data.data.user_name);
        return true;
      }
    } else if (!token && to.path !== "/") {
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      return "/";
    }
  } catch (err) {
    if (!err.response.data.isValid) {
      toast.error(err.response.data.error);
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("id");
      localStorage.removeItem("token");
      return "/";
    } else {
      console.log(err);
    }
  }
});

export default router;
