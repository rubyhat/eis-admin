import { create } from "zustand";
import {
  CategoryType,
  EthernetType,
  FurnitureType,
  HouseConditionType,
  HouseRoofMaterialType,
  HouseWallMaterialType,
  ServiceType,
  VisibilityStatusType,
} from "../../CatalogModule/store";

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

const formFieldsDataInitial: FormFieldsData = {
  description: "",
  price: 0,
  discount: 0,
  images: [],
  videoLink: "",
  mortgage: false,
  hasSwap: false,
  isCommercial: false,
  isPledge: false,
  isDocumentsGood: true,
  type: "sell",
  category: "apartment",
  visibilityStatus: "checking",
  estateAgent: "roze",
  city: "krg",
  street: "",
  houseNumber: "",
  isInfoHidden: false,
  mapLink: "",
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

export interface FormFieldsData {
  category: CategoryType;
  visibilityStatus: VisibilityStatusType;
  type: ServiceType;
  price: number;
  discount: number;
  description: string;
  images: FileList | [];
  videoLink: string;
  estateAgent: string; // todo: transform to EstateAgentInfo interface
  city: string;
  street: string;
  houseNumber: string;
  mapLink: string;
  mortgage: boolean;
  hasSwap: boolean;
  isCommercial: boolean;
  isPledge: boolean;
  isDocumentsGood: boolean;
  isInfoHidden: boolean;
}

export interface Apartment extends FormFieldsData {
  roomCount: number; // Количество комнат
  houseBuildingYear: number; // Год постройки
  houseSquare: number; // Площадь общая
  kitchenSquare: number; // Площадь кухни
  countFloor: number; // Количество этажей в квартире/доме (бывают двухэтажные квартиры, трех этажные котеджи и т.д.)
  ceilingHeight: number; // Высота потолков
  toiletCount: number; // Количество сан.узлов
  houseCondition: HouseConditionType; // Состояние дома
  houseWallMaterial: HouseWallMaterialType; // Материал стен
  houseRoofMaterial: HouseRoofMaterialType; // Материал крыши
  furniture: FurnitureType; // Мебелирован ли?
  ethernet: EthernetType; // Интернет
}

export interface CreateEstate {
  step: number;
  setStep: (v: number) => void;
  listLinkSteps: ListLinkSteps;
  formFieldsData: FormFieldsData | Apartment;
  setFormFieldsData: (v: FormFieldsData | Apartment) => void;
}

export const useCreateEstateStore = create<CreateEstate>((set) => ({
  step: 3,
  setStep: (v) => set({ step: v }),
  listLinkSteps: listLinkStepsData,
  formFieldsData: formFieldsDataInitial,
  setFormFieldsData: (v) => set({ formFieldsData: v }),
}));
