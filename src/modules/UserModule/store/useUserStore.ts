import { create } from "zustand";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export interface UserStore {
  user: EstateAgentInfo | null;
  setUser: (v: EstateAgentInfo) => void;
}

export const useUserStore = create<UserStore>((set) => {
  const userFromStorage = localStorage.getItem("user");
  const initUser = userFromStorage ? JSON.parse(userFromStorage) : null;

  return {
    user: initUser,
    setUser: (v) => set({ user: v }),
  };
});
