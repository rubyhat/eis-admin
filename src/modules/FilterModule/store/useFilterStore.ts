import { create } from "zustand";
import {
  CategoryType,
  HouseConditionType,
  HouseWallMaterialType,
  ServiceType,
} from "../../CatalogModule/store";

export interface FilterState {
  city: string;
  roomCount: string;
  priceStart: string;
  priceEnd: string;
  houseSquare: string;
  kitchenSquare: string;
  houseBuildingYear: string;
  mortgage: boolean;
  hasSwap: boolean;
  type: ServiceType;
  category: CategoryType | "";
  houseWallMaterial: HouseWallMaterialType | "";
  houseCondition: HouseConditionType | "";
}

export const initialFilterState: FilterState = {
  city: "",
  category: "",
  houseWallMaterial: "",
  houseCondition: "",
  roomCount: "",
  priceStart: "",
  priceEnd: "",
  houseSquare: "",
  kitchenSquare: "",
  houseBuildingYear: "",
  mortgage: false,
  hasSwap: false,
  type: "sell",
};

export interface FilterStore {
  isMobileFilterModalOpen: boolean;
  filterState: FilterState;
  setIsMobileFilterModalOpen: (v: boolean) => void;
  setFilterState: (v: FilterState) => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  isMobileFilterModalOpen: false,
  filterState: initialFilterState,
  setIsMobileFilterModalOpen: (v) => set({ isMobileFilterModalOpen: v }),
  setFilterState: (v: FilterState) => set({ filterState: v }),
}));
