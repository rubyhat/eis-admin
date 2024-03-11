import { create } from "zustand";
import { EstateAgentInfo } from "../../../shared/interfaces/EstateObjectTypes";

export interface FeedbackOrder {
  _id: string; // Айдишник
  name: string; // Имя из формы
  phone: string; // Номер телефона из формы
  description?: string; // Здесь уже сотрудники будут примечания писать
  estateId?: string; // Айдишник объекта недвижимости, с которого пришла заявки
  estateAgent?: EstateAgentInfo | null; // Объект с данными сотрудника, за которым заявка будет закреплена
  title?: string;
}

interface FeedbackOrdersStore {
  orders: FeedbackOrder[];
  isMobileFilterModalOpen: boolean;
  setIsMobileFilterModalOpen: (v: boolean) => void;
  setOrders: (v: FeedbackOrder[]) => void;
}

const tempOrders: FeedbackOrder[] = [
  {
    _id: "1",
    name: "Иван Иванов",
    phone: "+77011234567",
    title: "Нуркена Абидрова, 5, 2/5",
  },
  {
    _id: "2",
    name: "Арман Арманович",
    phone: "+77021234567",
    title: "Нуркена Абидрова, 5, 2/5",
  },
  {
    _id: "3",
    name: "Василий Иванов",
    phone: "+77031234567",
    title: "Нуркена Абидрова, 5, 2/5",
  },
  {
    _id: "4",
    name: "Иван Тимурович",
    phone: "+77041234567",
    title: "Нуркена Абидрова, 5, 2/5",
  },
];

export const useFeedbackOrdersStore = create<FeedbackOrdersStore>((set) => ({
  orders: tempOrders, // todo: remove temp
  isMobileFilterModalOpen: false,
  setIsMobileFilterModalOpen: (v) => set({ isMobileFilterModalOpen: v }),
  setOrders: (v) => set({ orders: v }),
}));
