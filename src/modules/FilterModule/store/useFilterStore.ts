import { create } from "zustand";

export interface FilterStore {
  isMobileFilterModalOpen: boolean;
  setIsMobileFilterModalOpen: (v: boolean) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  isMobileFilterModalOpen: false,
  setIsMobileFilterModalOpen: (v) => set({ isMobileFilterModalOpen: v }),
}));
