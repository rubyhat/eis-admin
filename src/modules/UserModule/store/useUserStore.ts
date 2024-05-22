import { create } from "zustand";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export interface UserStore {
  user: EstateAgentInfo | null;
  isAdmin: boolean;
  isManager: boolean;
  setUser: (v: EstateAgentInfo) => void;
  setIsAdmin: (v: boolean) => void;
  setIsManager: (v: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => {
  const userFromStorage = localStorage.getItem("user");
  const initUser = userFromStorage ? JSON.parse(userFromStorage) : null;
  // todo: заменить булеаны на role:string;
  const isAdmin = userFromStorage
    ? JSON.parse(userFromStorage).role === "Admin"
    : false;
  const isManager = userFromStorage
    ? JSON.parse(userFromStorage).role === "Manager"
    : false;

  return {
    user: initUser,
    isAdmin: isAdmin,
    isManager: isManager,
    setUser: (v) => set({ user: v }),
    setIsAdmin: (v) => set({ isAdmin: v }),
    setIsManager: (v) => set({ isManager: v }),
  };
});
