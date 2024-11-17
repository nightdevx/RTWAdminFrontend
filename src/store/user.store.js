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

const register = async (userData, set) => {
  if (!(await checkIsMaster())) {
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
};

const login = async (email, password, set) => {
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
};

const fetchUser = async (id, set) => {
  set({ user: null, error: null });

  try {
    const response = await apiWithAuth.get(`/users/${id}`);
    set({ user: response.data, error: null });
  } catch (err) {
    set({ error: err.response.data });
  }
};

const fetchAllUsers = async (set) => {
  set({ users: null, error: null });

  try {
    const response = await apiWithAuth.get(`/users`);
    console.log(response.data);
    set({ users: response.data, error: null });
  } catch (err) {
    set({ error: err.response.data });
  }
};

const deleteUser = async (id, set) => {
  if (!(await checkIsMaster())) {
    set({ error: "You are not a master" });
    return;
  }
  set({ error: null });

  try {
    await apiWithAuth.delete(`/users/${id}`);
    set((state) => ({
      users: state.users.filter((user) => user._id !== id),
      error: null,
    }));
  } catch (err) {
    set({ error: err.response.data });
  }
};

const logout = (set) => {
  set({ user: null });
  sessionStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isMaster");

  delete axios.defaults.headers.common["Authorization"];
};

const useUserStore = create((set) => ({
  users: [],
  user: null,
  error: null,
  register: (userData) => register(userData, set),
  login: (email, password) => login(email, password, set),
  fetchUser: (id) => fetchUser(id, set),
  fetchAllUsers: () => fetchAllUsers(set),
  deleteUser: (id) => deleteUser(id, set),
  logout: () => logout(set),
}));

export default useUserStore;
