import { create } from "zustand";
import {
  Apartment,
  CategoryType,
  Flat,
  FormFieldsData,
  FormFieldsType,
  House,
  Land,
  ServiceType,
} from "../../../shared/interfaces/EstateObjectTypes";

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

const agentFromLocalStorage = localStorage.getItem("user");
const agentObjectFromLocalStorage = agentFromLocalStorage
  ? JSON.parse(agentFromLocalStorage).id
  : "";

const formFieldsDataInitial: FormFieldsType = {
  // basic values
  description: "",
  price: null,
  discount: null,
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
  estateAgent: agentObjectFromLocalStorage,
  geoPosition: {
    city: "Караганда",
    street: "",
    houseNumber: null,
    isInfoHidden: false,
    mapLink: "",
  },

  // Apartment
  roomCount: null,
  houseBuildingYear: null,
  houseSquare: null,
  kitchenSquare: null,
  countFloor: null,
  ceilingHeight: null,
  toiletCount: null,
  houseCondition: "",
  houseWallMaterial: "",
  houseRoofMaterial: "",
  furniture: "",
  ethernet: "",

  // House
  plotSquare: null,
  hasBasement: false,
  hasMansard: false,
  houseType: "",
  electricType: "",
  heatingType: "",
  gasType: "",
  sewerType: "",
  toiletType: "",
  waterType: "",

  // Flat
  targetFloor: null,
  totalFloor: null,

  // Land
  landSquare: "",
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
  formFieldsData: FormFieldsData | Apartment | House | Flat | Land;
  setFormFieldsData: (
    v: FormFieldsData | Apartment | House | Flat | Land,
  ) => void;
}

export const useCreateEstateStore = create<CreateEstate>((set) => ({
  step: 3,
  setStep: (v) => set({ step: v }),
  listLinkSteps: listLinkStepsData,
  formFieldsData: formFieldsDataInitial,
  setFormFieldsData: (v) => set({ formFieldsData: v }),
}));
