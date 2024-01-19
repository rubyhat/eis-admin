import { create } from "zustand";

export interface LoginStore {
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  isAuth: false,
  setIsAuth: (v) => set({ isAuth: v }),
}));
