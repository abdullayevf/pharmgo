import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    baseUri: "https://pharmgo.onrender.com",
  }),

  getters: {
    userRole: (state) => state.user?.role || "guest",

    isAdmin: (state) => state.user?.role === "admin",
  },

  actions: {
    setLoading(status) {
      this.isLoading = status;
    },

    setError(message) {
      this.error = message;
      console.log(message);
    },

    clearError() {
      this.error = null;
    },

    async login(user) {
      this.setLoading(true);
      this.clearError();

      try {
        const { data, error } = await useFetch(`${this.baseUri}/auth/login`, {
          method: "POST",
          body: user,
        });

        if (error.value) {
          // Extract error message from the API response if available
          if (error.value.data && error.value.data.error) {
            throw new Error(error.value.data.error);
          } else {
            throw new Error(error.value.message || "Failed to login");
          }
        }

        this.setUser(data.value.user);
        this.setToken(data.value.token);
        this.isAuthenticated = true;

        localStorage.setItem("token", data.value.token);
        navigateTo("/dashboard");
        return data.value;
      } catch (err) {
        this.setError(err.message || "Failed to login");
        throw err;
      } finally {
        this.setLoading(false);
      }
    },

    async register(user) {
      this.isLoading = true;
      this.clearError();

      try {
        const { data, error } = await useFetch(
          `${this.baseUri}/auth/register`,
          {
            method: "POST",
            body: user,
          }
        );

        if (error.value) {
          throw new Error(error.value.message || "Failed to register");
        }

        this.setUser(data.value.user);
        this.setToken(data.value.token);
        this.isAuthenticated = true;

        localStorage.setItem("token", data.value.token);

        return data.value;
      } catch (err) {
        this.setError(err.message || "Failed to register");
        throw err;
      } finally {
        this.setLoading(false);
      }
    },

    logout() {
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;

      localStorage.removeItem("token");

      navigateTo(this.baseUri);
    },

    setUser(user) {
      this.user = user;
    },

    setToken(token) {
      this.token = token;
    },

    async initAuth() {
      const token = localStorage.getItem("token");

      if (!token) return;

      this.token = token;
      this.isAuthenticated = true;

      try {
        const { data, error } = await useFetch(`${this.baseUri}/auth/me`, {
          headers: {
            Authroization: `Bearer ${token}`,
          },
        });

        if (error.value) {
          throw new Error("Invalid token");
        }

        this.setUser(data.value);
      } catch (err) {
        this.logout();
      }
    },

    getAuthHeaders() {
      return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    },
  },
});
