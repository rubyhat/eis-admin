import { create } from "zustand";

export interface UsersStore {
  isDeleteDrawerOpen: boolean;
  setIsDeleteDrawerOpen: (v: boolean) => void;
}

export const useUsersStore = create<UsersStore>((set) => ({
  isDeleteDrawerOpen: false,
  setIsDeleteDrawerOpen: (v) => set({ isDeleteDrawerOpen: v }),
}));
