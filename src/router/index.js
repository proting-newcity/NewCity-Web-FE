import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import EditPemerintah from "@/components/EditPemerintah.vue";

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
      component: () => Login,
    },
    {
      path: "/pemerintah/:id",
      name: "edit-pemerintah ",
      component: () => EditPemerintah,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    const isAuthenticated = await authStore.getUser();
    console.log(!isAuthenticated && to.name != "login");

    if (!isAuthenticated && to.name != "login") {
      console.log(!isAuthenticated && to.name != "login");
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
