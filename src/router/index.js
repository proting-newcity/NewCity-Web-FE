import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Home from "../components/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      meta: {
        requiresAuth: false,
      },
      component: () => import("../components/Login.vue"),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    const isAuthenticated = await authStore.getUser();

    if (isAuthenticated) {
      next();
    } else {
      next({ name: "login" });
    }
  } else {
    next({ name: "home" });
  }
});

export default router;
