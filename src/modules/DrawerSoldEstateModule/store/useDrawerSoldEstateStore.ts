import { create } from "zustand";

interface DrawerSoldEstate {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (v: boolean) => void;
}

export const useDrawerSoldEstateStore = create<DrawerSoldEstate>((set) => ({
  isDrawerOpen: false,
  setIsDrawerOpen: (v) => set({ isDrawerOpen: v }),
}));
