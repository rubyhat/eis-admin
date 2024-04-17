import { create } from "zustand";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export type FeedbackOrderDisplay = Omit<FeedbackOrder, "estateAgent"> & {
  estateAgent: EstateAgentInfo | null;
  createdAt: string;
  updatedAt: string;
};
export interface FeedbackOrder {
  _id: string; // Айдишник
  name: string; // Имя из формы
  phone: string; // Номер телефона из формы
  status: FeedbackOrderStatus; // Статус заявки
  description?: string; // Здесь уже сотрудники будут примечания писать
  estateId?: string; // Айдишник объекта недвижимости, с которого пришла заявки
  estateAgent?: string; // Объект с данными сотрудника, за которым заявка будет закреплена
  title?: string; // Основная краткая информация по объекту
}

export type FeedbackOrderStatus = "new" | "inWork" | "completed";

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
  status?: FeedbackOrderStatus | "";
}

export const initialFilterState: FilterState = {
  name: "",
  phone: "",
  status: "",
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
