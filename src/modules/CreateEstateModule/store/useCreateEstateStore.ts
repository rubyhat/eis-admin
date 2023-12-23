import { create } from "zustand";
import { CategoryType, ServiceType } from "../../CatalogModule/store";

const listLinkStepsData: ListLinkSteps = {
  service: [
    { id: "sell", title: "Продать", subtitle: "Продажа недвижимости" },
    { id: "rent", title: "Сдать в аренду", subtitle: "Помещение или участок" },
  ],
  category: [
    { id: "apartment", title: "Квартира", subtitle: "Квартиры и апартаменты" },
    { id: "house", title: "Дом", subtitle: "Частные дома" },
    {
      id: "land",
      title: "Земельный участок",
      subtitle: "Продажа недвижимости",
    },
    { id: "cottage", title: "Дачи", subtitle: "Продажа недвижимости" },
    {
      id: "business",
      title: "Бизнес",
      subtitle: "Помещения для бизнеса",
    },
    {
      id: "factory",
      title: "Предприятия",
      subtitle: "Промбазы и заводы",
    },
    { id: "other", title: "Другое", subtitle: "Что-то не стандартное" },
  ],
};

export interface ListLinkSteps {
  service: StepData[];
  category: StepData[];
}

export interface StepData {
  id: ServiceType | CategoryType;
  title: string;
  subtitle: string;
}

export interface CreateEstate {
  step: number;
  setStep: (v: number) => void;
  listLinkSteps: ListLinkSteps;
}

export const useCreateEstateStore = create<CreateEstate>((set) => ({
  step: 1,
  setStep: (v) => set({ step: v }),
  listLinkSteps: listLinkStepsData,
}));
