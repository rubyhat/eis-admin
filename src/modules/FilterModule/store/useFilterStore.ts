import { create } from "zustand";
import {
  CategoryType,
  HouseConditionType,
  HouseWallMaterialType,
  PledgeType,
  ServiceType,
  VisibilityStatusType,
} from "../../../shared/interfaces/EstateObjectTypes";

export interface FilterState {
  city: string;
  roomCount: string;
  priceStart: string;
  priceEnd: string;
  houseSquare: string;
  kitchenSquare: string;
  houseBuildingYear: string;
  targetFloor: number | null;
  totalFloor: number | null;
  mortgage: boolean;
  hasSwap: boolean;
  type: ServiceType;
  category: CategoryType | "";
  houseWallMaterial: HouseWallMaterialType | "";
  houseCondition: HouseConditionType | "";
  visibilityStatus: VisibilityStatusType | "";
  pledge: PledgeType | "";
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
  visibilityStatus: "",
  pledge: "",
  mortgage: false,
  hasSwap: false,
  type: "sell",
  targetFloor: null,
  totalFloor: null,
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
