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
      this.router.push("/login");
    },
  },
});
