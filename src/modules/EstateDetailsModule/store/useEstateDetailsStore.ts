import { create } from "zustand";
import {
  DisplayEstateObject,
  VisibilityStatusType,
} from "../../../shared/interfaces/EstateObjectTypes";

interface EstateDetailsStore {
  activeImage: string | null;
  estateDetails: DisplayEstateObject | null;
  activeImageIndex: string | null;
  isViewerModalOpen: boolean;
  setActiveImage: (v: string | null, i: string | null) => void;
  setEstateDetails: (v: DisplayEstateObject) => void;
  setIsViewerModalOpen: (v: boolean) => void;
  isDeleteDrawerOpen: boolean;
  setIsDeleteDrawerOpen: (v: boolean) => void;
  setCurrentVisibilityStatus: (v: VisibilityStatusType) => void;
  currentVisibilityStatus: VisibilityStatusType;
}

export const useEstateDetailsStore = create<EstateDetailsStore>((set) => ({
  estateDetails: null,
  activeImage: null,
  activeImageIndex: null,
  isViewerModalOpen: false,
  isDeleteDrawerOpen: false,
  currentVisibilityStatus: "checking",
  setCurrentVisibilityStatus: (v) => set({ currentVisibilityStatus: v }),
  setEstateDetails: (v) => set({ estateDetails: v }),
  setIsViewerModalOpen: (v) => set({ isViewerModalOpen: v }),
  setActiveImage: (v, i) => set({ activeImage: v, activeImageIndex: i }),
  setIsDeleteDrawerOpen: (v) => set({ isDeleteDrawerOpen: v }),
}));
