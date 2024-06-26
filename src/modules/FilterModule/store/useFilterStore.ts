import { create } from "zustand";
import {
  CategoryType,
  DocumentsType,
  ExchangeType,
  HouseConditionType,
  HouseWallMaterialType,
  MortgageType,
  PledgeType,
  ServiceType,
  VisibilityStatusType,
} from "../../../shared/interfaces/EstateObjectTypes";

export interface FilterState {
  city: string;
  cityRegion: string;
  roomCount: string;
  priceStart: string;
  priceEnd: string;
  houseSquare: string;
  houseSquareEnd: string;
  kitchenSquare: string;
  houseBuildingYear: string;
  targetFloor: number | null;
  totalFloor: number | null;
  notFirstFloor: boolean;
  notLastFloor: boolean;
  type: ServiceType;
  exchange: ExchangeType | "";
  mortgage: MortgageType | "";
  category: CategoryType | "";
  houseWallMaterial: HouseWallMaterialType | "";
  houseCondition: HouseConditionType | "";
  visibilityStatus: VisibilityStatusType | "";
  pledge: PledgeType | "";
  documents: DocumentsType | "";
}

export const initialFilterState: FilterState = {
  city: "",
  cityRegion: "",
  category: "",
  houseWallMaterial: "",
  houseCondition: "",
  roomCount: "",
  priceStart: "",
  priceEnd: "",
  houseSquare: "",
  houseSquareEnd: "",
  kitchenSquare: "",
  houseBuildingYear: "",
  visibilityStatus: "",
  pledge: "",
  documents: "",
  mortgage: "",
  exchange: "",
  type: "sell",
  targetFloor: null,
  totalFloor: null,
  notFirstFloor: false,
  notLastFloor: false,
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
