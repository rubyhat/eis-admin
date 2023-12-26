import { create } from "zustand";

export interface LoginStore {
  isAuth: boolean;
  setIsAuth: (v: boolean) => void;
}

export const useLoginStore = create<LoginStore>((set) => ({
  isAuth: true, //todo: switch to false in default
  setIsAuth: (v) => set({ isAuth: v }),
}));
