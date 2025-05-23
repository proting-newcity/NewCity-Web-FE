import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import EditPemerintah from "@/components/EditPemerintah.vue";
import TablePemerintah from "@/components/TablePemerintah.vue";
import TableBerita from "@/components/TableBerita.vue";
import Laporan from "@/components/Report.vue";
import AddBerita from "@/components/AddBerita.vue";
import EditBerita from "@/components/EditBerita.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        { path: "", redirect: "berita" },
        {
          path: "berita",
          component: TableBerita,
          name: "berita.table",
          children: [
            { path: "add", name: "berita.add", component: AddBerita },
            { path: ":id", name: "berita.edit", component: EditBerita },
          ],
        },
        { path: "laporan", component: Laporan, name: "laporan.table" },
        {
          path: "pemerintah",
          component: TablePemerintah,
          name: "pemerintah.table",
          children: [
            {
              path: ":id",
              name: "pemerintah.edit",
              component: EditPemerintah,
            },
          ],
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth) {
    const isAuthenticated = await authStore.getUser();

    if (!isAuthenticated && to.name != "login") {
      next({ name: "login" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
