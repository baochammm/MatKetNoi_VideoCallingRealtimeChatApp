import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("matketnoi-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("matketnoi-theme", theme);
    set({ theme });
  },
}));
