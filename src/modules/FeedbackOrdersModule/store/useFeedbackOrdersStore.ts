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
  isDeleteDrawerOpen: boolean;
  deleteOrderId: string | null;
  orders: FeedbackOrderDisplay[];
  isMobileFilterModalOpen: boolean;
  setIsMobileFilterModalOpen: (v: boolean) => void;
  setIsDeleteDrawerOpen: (v: boolean, orderId?: string) => void;
  setOrders: (v: FeedbackOrderDisplay[]) => void;
}

export const useFeedbackOrdersStore = create<FeedbackOrdersStore>((set) => ({
  orders: [],
  deleteOrderId: null,
  isDeleteDrawerOpen: false,
  isMobileFilterModalOpen: false,
  setOrders: (v) => set({ orders: v }),
  setIsDeleteDrawerOpen: (v, orderId) =>
    set({ isDeleteDrawerOpen: v, deleteOrderId: orderId }),
  setIsMobileFilterModalOpen: (v) => set({ isMobileFilterModalOpen: v }),
}));
