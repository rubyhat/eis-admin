import { create } from "zustand";

export interface LoginStore {
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
}

export const useLoginStore = create<LoginStore>((set) => {
  const isAuthFromStorage = localStorage.getItem("isAuth");
  const isAuth = isAuthFromStorage ? JSON.parse(isAuthFromStorage) : false;

  return {
    isAuth: isAuth,
    setIsAuth: (v) => {
      localStorage.setItem("isAuth", JSON.stringify(v));
      set({ isAuth: v });
    },
  };
});
