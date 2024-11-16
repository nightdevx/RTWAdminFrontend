import { create } from "zustand";
import axios from "axios";
import { apiWithAuth, apiWithoutAuth } from "../config/axios.config";
import { set } from "react-hook-form";

const checkIsMaster = async () => {
  set({ error: null });
  try {
    const response = await apiWithAuth.post(`/users/checkIsMaster`);
    console.log(response.data);

    return response.data;
  } catch (err) {
    set({ error: err.response.data });
  }
};

const useUserStore = create((set) => ({
  users: [],
  user: null,
  error: null,
  register: async (userData) => {
    if (!checkIsMaster()) {
      set({ error: "You are not a master" });
      return;
    }
    set({ error: null });
    try {
      const response = await apiWithAuth.post(`/users/register`, {
        userData,
      });
      set((state) => ({
        users: [...state.users, response.data],
        error: null,
      }));
    } catch (err) {
      set({ error: err.response.data });
    }
  },
  login: async (email, password) => {
    try {
      const response = await apiWithoutAuth.post(`/users/login`, {
        email,
        password,
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      sessionStorage.setItem("token", response.data.token);
      const isMaster = await checkIsMaster();
      if (isMaster) {
        console.log("isMaster");
        localStorage.setItem("isMaster", true);
      }
      set({
        error: null,
      });
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (err) {
      set({ error: err.response.data });
    }
  },
  fetchUser: async (id) => {
    set({ user: null, error: null });

    try {
      const response = await apiWithAuth.get(`/users/${id}`);
      set({ user: response.data, error: null });
    } catch (err) {
      set({ error: err.response.data });
    }
  },

  fetchAllUsers: async () => {
    set({ users: null, error: null });

    try {
      const response = await apiWithAuth.get(`/users`);
      console.log(response.data);
      set({ users: response.data, error: null });
    } catch (err) {
      set({ error: err.response.data });
    }
  },
  logout: () => {
    set({ user: null });
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isMaster");

    delete axios.defaults.headers.common["Authorization"];
  },
}));

export default useUserStore;
