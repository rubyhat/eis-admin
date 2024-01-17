import { create } from "zustand";
import {
  CategoryType,
  ElectricType,
  EthernetType,
  FurnitureType,
  GasType,
  HeatingType,
  HouseConditionType,
  HouseRoofMaterialType,
  HouseType,
  HouseWallMaterialType,
  ServiceType,
  SewerType,
  ToiletType,
  VisibilityStatusType,
  WaterType,
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

const formFieldsDataInitial: FormFieldsData | Apartment | House | Flat | Land =
  {
    // basic values
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

    // Apartment
    roomCount: 1,
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
  houseBuildingYear: number | null; // Год постройки
  houseSquare: number | null; // Площадь общая
  kitchenSquare: number | null; // Площадь кухни
  countFloor: number | null; // Количество этажей в квартире/доме (бывают двухэтажные квартиры, трех этажные котеджи и т.д.)
  ceilingHeight: number | null; // Высота потолков
  toiletCount: number | null; // Количество сан.узлов
  houseCondition: HouseConditionType | ""; // Состояние дома
  houseWallMaterial: HouseWallMaterialType | ""; // Материал стен
  houseRoofMaterial: HouseRoofMaterialType | ""; // Материал крыши
  furniture: FurnitureType | ""; // Мебелирован ли?
  ethernet: EthernetType | ""; // Интернет
}

// Только в доме
export interface House extends Apartment {
  plotSquare: number | null; // Площадь/количество соток земли у дома
  hasBasement: boolean; // Есть/нет цокольный этаж
  hasMansard: boolean; // Есть/нет мансарда
  houseType: HouseType | ""; // Тип дома, бывает что в одном доме два хозяина, поделен по-полам;
  electricType: ElectricType | "";
  heatingType: HeatingType | "";
  gasType: GasType | "";
  sewerType: SewerType | "";
  toiletType: ToiletType | "";
  waterType: WaterType | "";
}
// Только в квартире
export interface Flat extends Apartment {
  targetFloor: number | null; // Этаж, на котором находится объект
  totalFloor: number | null; // Общее количество этажей в здании
}

export interface Commercial extends FormFieldsData {}
export interface Business extends FormFieldsData {}
export interface Factory extends FormFieldsData {}
export interface OtherObject extends FormFieldsData {}

export interface Land extends FormFieldsData {
  landSquare: string; // Площадь земли
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
