import { create } from "zustand";

const useMenuStore = create((set) => ({
  isMenuCollapsed: false,
  toggleMenu: () =>
    set((state) => ({ isMenuCollapsed: !state.isMenuCollapsed })),
}));

export default useMenuStore;
