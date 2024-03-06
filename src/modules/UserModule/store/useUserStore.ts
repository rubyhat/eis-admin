import { create } from "zustand";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export interface UserStore {
  user: EstateAgentInfo | null;
  isAdmin: boolean;
  setUser: (v: EstateAgentInfo) => void;
  setIsAdmin: (v: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => {
  const userFromStorage = localStorage.getItem("user");
  const initUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  const isAdmin = userFromStorage
    ? JSON.parse(userFromStorage).role === "Admin"
    : false;

  return {
    user: initUser,
    isAdmin: isAdmin,
    setUser: (v) => set({ user: v }),
    setIsAdmin: (v) => set({ isAdmin: v }),
  };
});
