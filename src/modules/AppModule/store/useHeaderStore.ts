import { create } from "zustand";

export interface HeaderStore {
  isHeaderBurgerOpen: boolean;
  setIsHeaderBurgerOpen: (v: boolean) => void;
}

export const useHeaderStore = create<HeaderStore>((set) => ({
  isHeaderBurgerOpen: false,
  setIsHeaderBurgerOpen: (v) => set(() => ({ isHeaderBurgerOpen: v })),
}));
