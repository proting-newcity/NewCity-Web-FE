import { defineStore } from "pinia";
import axios from "axios";
import EditPemerintah from "@/components/EditPemerintah.vue";

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

    async handleLogout() {
      await axios.post("/logout");
      this.authUser = null;
    },

    async getBerita(page = 1) {
      try {
        const response = await axios.get(`/api/berita?page=${page}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching berita:", error);
        throw error;
      }
    },

    async getPemerintah(page = 1) {
      try {
        const response = await axios.get(`/api/pemerintah?page=${page}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async getPemerintahById(id) {
      try {
        const response = await axios.get(`/api/pemerintah/${id}`);
        return response;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async updatePemerintah(data, id) {
      try {
        const response = await axios.post(`/api/pemerintah/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        for (var pair of data.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        // this.router.push("/");
        return response;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async deletePemerintah(id) {
      try {
        const response = await axios.delete(`/api/pemerintah/${id}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },

    async getInstitusi() {
      try {
        const response = await axios.get(`/api/institusi`);
        return response.data;
      } catch (error) {
        console.error("Error fetching pemerintah:", error);
        throw error;
      }
    },
  },
});
