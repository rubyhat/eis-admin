import { create } from "zustand";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export interface LoginStore {
  isAuth: boolean;
  user: EstateAgentInfo | null;
  setIsAuth: (v: boolean) => void;
  setUser: (v: EstateAgentInfo) => void;
}

export const useLoginStore = create<LoginStore>((set) => {
  const isAuthFromStorage = localStorage.getItem("isAuth");
  const isAuth = isAuthFromStorage ? JSON.parse(isAuthFromStorage) : false;

  const userFromStorage = localStorage.getItem("user");
  const initUser = userFromStorage ? JSON.parse(userFromStorage) : null;

  return {
    isAuth: isAuth,
    user: initUser,
    setIsAuth: (v) => {
      localStorage.setItem("isAuth", JSON.stringify(v));
      set({ isAuth: v });
    },
    setUser: (v) => set({ user: v }),
  };
});
