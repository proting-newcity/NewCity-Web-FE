import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    berita: null,
    laporan: null,
    pemerintah: null,
    error: null,
  }),

  getters: {
    user: (state) => state.authUser,
    news: (state) => state.berita,
    report: (state) => state.laporan,
    goverment: (state) => state.pemerintah,
    errors: (state) => state.error,
  },

  actions: {
    async getToken() {
      await axios.get("/sanctum/csrf-cookie");
    },

    async getUser() {
      try {
        await this.getToken();
        const data = await axios.get("/api/user");
        this.authUser = data.data;
        return true;
      } catch (e) {
        this.authUser = null;
        console.error("Error fetching user:", e);
        return false;
      }
    },

    async handleLogin(username, password, alwaysSignedIn) {
      try {
        await this.getToken();
        await axios.post("/login", {
          username: username,
          password: password,
          role: "admin",
          always_signed_in: alwaysSignedIn,
        });

        this.error = null;
        this.router.push("/");
      } catch (error) {
        if (
          error.response.status === 401 ||
          error.response.status === 403 ||
          error.response.status === 422
        ) {
          this.error = error.response.data.message;
        } else {
          this.error =
            "Error connecting to the server. Please try again later.";
        }
      }
    },

    async getBerita(page = 1) {
      try {
        const response = await axios.get(`/api/berita?page=${page}`);
        return response.data; // Kembalikan data API
      } catch (error) {
        console.error("Error fetching berita:", error);
        throw error;
      }
    },
  },
});
