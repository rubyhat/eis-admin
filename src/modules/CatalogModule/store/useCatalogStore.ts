import { create } from "zustand";
import {
  CategoryType,
  ElectricType,
  EthernetType,
  FurnitureType,
  GasType,
  GeoPositionInfo,
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
} from "../../../shared/interfaces/EstateObjectTypes";
import { DisplayEstateObject } from "../../CreateEstateModule/store";

export type ActiveSortType = "new" | "cheap" | "rich";
export type AllObjectsType = ObjectItem | Apartment | House | Flat;

export interface EstateAgentInfo {
  id: string; // uuid?
  name: string;
  avatar: string;
  phone: string;
}

// Общие характеристики, вне зависимости от категории объекта
export interface ObjectItem {
  id: string; // Уникальный айди экземпляра
  description: string; // Текстовое описание объекта недвижимости
  price: number; // or string? Стоимость
  discount: number; // or string? Размер снижения стоимость(скидки)
  images: string[]; // Пачка фотографий объекта недвижимости
  videoLink: string; // Ссылка на видео обзор
  mortgage: boolean; // Имеется ли ипотека по данному объекту
  hasSwap: boolean; // Есть обмен да/нет
  isCommercial: boolean; // Коммерческая недвижимости или нет
  isPledge: boolean; // В залоге да или нет
  isDocumentsGood: boolean; // Документы в порядке или нет
  type: ServiceType; // Купить или сдать в аренду
  visibilityStatus: VisibilityStatusType; // Статус видимости объекта
  category: CategoryType; // Квартира, дом, земельный участок и так далее
  estateAgent: EstateAgentInfo; // Данные об агенте недвижимости, который сопровождает этот объект, к нему будут все звонить писать и задавать вопросы
  geoPosition: GeoPositionInfo; // Данные об объекте недвижимости, где она
}

// Общие характеристики, которые могут быть в квартире/доме
export interface Apartment extends ObjectItem {
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

// Только в доме
export interface House extends Apartment {
  plotSquare: number; // Площадь/количество соток земли у дома
  hasBasement: boolean; // Есть/нет цокольный этаж
  hasMansard: boolean; // Есть/нет мансарда
  houseType: HouseType; // Тип дома, бывает что в одном доме два хозяина, поделен по-полам;
  electricType: ElectricType;
  heatingType: HeatingType;
  gasType: GasType;
  sewerType: SewerType;
  toiletType: ToiletType;
  waterType: WaterType;
}
// Только в квартире
export interface Flat extends Apartment {
  targetFloor: number; // Этаж, на котором находится объект
  totalFloor: number; // Общее количество этажей в здании
}

export interface Commercial extends ObjectItem {}
export interface Business extends ObjectItem {}
export interface Factory extends ObjectItem {}
export interface OtherObject extends ObjectItem {}

export interface Land extends ObjectItem {
  landSquare: string; // Площадь земли
}
export interface CatalogStore {
  activeSortType: VisibilityStatusType;
  estateObjects: DisplayEstateObject[];
  setActiveSortType: (v: VisibilityStatusType) => void;
  setEstateObjects: (v: DisplayEstateObject[]) => void;
}

export const useCatalogStore = create<CatalogStore>((set) => ({
  activeSortType: "active",
  estateObjects: [],
  setActiveSortType: (v) => set({ activeSortType: v }),
  setEstateObjects: (v) => set({ estateObjects: v }),
}));
