import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authUser: null,
    error: null,
  }),

  getters: {
    user: (state) => state.authUser,
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
      } catch (e) {
        console.error("Error fetching user:", e);
      }
    },

    async handleLogin(username, password) {
      try {
        await this.getToken();
        const response = await axios.post("/login", {
          username: username,
          password: password,
          role: "admin",
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
  },
});
