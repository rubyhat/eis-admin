import { create } from "zustand";

const tempThumbs = [
  "/static/images/img-details-temp-1.webp",
  "/static/images/img-details-temp-2.webp",
  "/static/images/img-details-temp-1.webp",
  "/static/images/img-details-temp-2.webp",
  "/static/images/img-details-temp-1.webp",
  "/static/images/img-details-temp-2.webp",
  "/static/images/img-details-temp-1.webp",
  "/static/images/img-details-temp-2.webp",
  "/static/images/img-details-temp-1.webp",
  "/static/images/img-details-temp-2.webp",
  "/static/images/img-details-temp-1.webp",
  "/static/images/img-details-temp-2.webp",
];

interface EstateDetailsStore {
  images: string[];
  activeImage: string;
  activeImageIndex: number;
  isViewerModalOpen: boolean;
  setImages: (v: string[]) => void;
  setActiveImage: (v: string, i: number) => void;
  setIsViewerModalOpen: (v: boolean) => void;
}

export const useEstateDetailsStore = create<EstateDetailsStore>((set) => ({
  activeImage: tempThumbs[0],
  activeImageIndex: 0,
  images: tempThumbs,
  isViewerModalOpen: false,
  setImages: (v) => set({ images: v }),
  setActiveImage: (v, i) => set({ activeImage: v, activeImageIndex: i }),
  setIsViewerModalOpen: (v) => set({ isViewerModalOpen: v }),
}));
