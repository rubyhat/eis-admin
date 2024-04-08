import { create } from "zustand";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export type FeedbackOrderDisplay = Omit<FeedbackOrder, "estateAgent"> & {
  estateAgent: EstateAgentInfo | null;
};
export interface FeedbackOrder {
  _id: string; // Айдишник
  name: string; // Имя из формы
  phone: string; // Номер телефона из формы
  description?: string; // Здесь уже сотрудники будут примечания писать
  estateId?: string; // Айдишник объекта недвижимости, с которого пришла заявки
  estateAgent?: string; // Объект с данными сотрудника, за которым заявка будет закреплена
  title?: string;
}

interface FeedbackOrdersStore {
  filterState: FilterState;
  isDeleteDrawerOpen: boolean;
  deleteOrderId: string | null;
  orders: FeedbackOrderDisplay[];
  isMobileFilterModalOpen: boolean;
  setIsMobileFilterModalOpen: (v: boolean) => void;
  setIsDeleteDrawerOpen: (v: boolean, orderId?: string) => void;
  setOrders: (v: FeedbackOrderDisplay[]) => void;
  setFilterState: (v: FilterState) => void;
}

export interface FilterState {
  name?: string;
  phone?: string;
  estateId?: string;
  estateAgent?: string;
}

export const initialFilterState: FilterState = {
  name: "",
  phone: "",
  estateId: "",
  estateAgent: "",
};

export const useFeedbackOrdersStore = create<FeedbackOrdersStore>((set) => ({
  filterState: initialFilterState,
  orders: [],
  deleteOrderId: null,
  isDeleteDrawerOpen: false,
  isMobileFilterModalOpen: false,
  setOrders: (v) => set({ orders: v }),
  setFilterState: (v) => set({ filterState: v }),
  setIsDeleteDrawerOpen: (v, orderId) =>
    set({ isDeleteDrawerOpen: v, deleteOrderId: orderId }),
  setIsMobileFilterModalOpen: (v) => set({ isMobileFilterModalOpen: v }),
}));
