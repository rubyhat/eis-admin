export type CategoryType =
  | "apartment"
  | "house"
  | "land"
  | "cottage"
  | "business"
  | "factory"
  | "townhouse"
  | "other"; // Категория: квартира, дом, земельный участок, коммерческая недвижимость, бизнес, завод, другое
export type ServiceType = "sell" | "rent"; // Продажа или аренда
export type VisibilityStatusType =
  | "active"
  | "sold"
  | "canceled"
  | "checking"
  | "rented"; // Активен, Продан, Отменен, На проверке, Сдан в аренду на клиенте показываем только Активные
export type HouseConditionType = "perfect" | "good" | "bad" | "free" | "build"; // Хорошее, среднее, требует ремонта, свободная планировка, черновая отделка / евроремонт - косметический ремонт - без ремонта - предчистовая
export type HouseType = "part" | "full" | "other"; // Часть дома, Отдельностоящий, Другое
export type FurnitureType = "part" | "full" | "none"; // Мебелирован: частично, полностью, без мебели
export type ElectricType = "part" | "full" | "none"; // Электричество: частично, есть, нет
export type HeatingType = "central" | "gas" | "solid" | "liquid" | "none"; // Отопление: Центральное, на газу, на угле, на бензине, нет
export type GasType = "central" | "auto" | "canConnect" | "none"; // Газ: центральный, автономный, есть возможность подключить, нет
export type SewerType = "central" | "septic" | "canConnect" | "none"; // Канализация: центральная, септик, можно подключить, нет
export type ToiletType = "in" | "out" | "none"; // Туалет: в доме, на улице, нет
export type WaterType = "central" | "borehole" | "canConnect" | "none"; // Вода: центральная, скважина, можно подключить, нет
export type EthernetType = "connected" | "toConnect" | "none"; // Интернет: Подключен, Можно подключить, Нет
export type GarageType = "has" | "full" | "part" | "none"; // Гараж: Есть, входит в стоимость, есть, обсуждается отдельно, нет
export type PledgeType = "none" | "bank" | "police"; // Залог: нет, да у банка, да арест
export type DocumentsType = "good" | "needUpdate" | "needCheck" | "bad"; // Документы: В порядке, нужна корректировка, Есть проблемы
export type HouseWallMaterialType =
  | "brick" // Кирпич
  | "wood" // Дерево
  | "gasSilicateBlock" // Газосиликатный блок
  | "cinderBlock" // Шлакоблок
  | "heatBlock" // Теплоблок
  | "panel" // Панельный
  | "monolith" // Монолит
  | "saman" // Саман
  | "gasConcreteBlock" // Газобетонный блок
  | "foamBlock"; // Пеноблок
export type HouseRoofMaterialType =
  | "tile" // Черепица
  | "soft" // Мягкая кровля
  | "metal" // Металл
  | "ondulin" // Ондулин
  | "metalTile" // Металлочерепица
  | "corrugatedSheetRoof" // Профлист
  | "slate"; // Шифер
export type MortgageType = "accepted" | "declined" | "possibly";
export type ExchangeType = "yes" | "no";
export type BusinessType =
  | "freeSpace"
  | "cafe"
  | "office"
  | "areaBase"
  | "factory"
  | "store"; // свободное помещение, кафе и рестораны, офисы, базы, заводы, магазины

export interface ObjectImages {
  _id: string;
  imageUrl: string;
  thumbnailUrl: string;
}

export interface GeoPositionInfo {
  city: string; // Город
  street: string; // Улица
  houseNumber: number | null; // Номер дома
  isInfoHidden: boolean; // Свитчер для сокрытия адреса
  mapLink: string; // Ссылка на 2гис
  cityRegion?: string;
}
// todo: need avatar from backend

export type UserRole = "Admin" | "Manager" | "Member";
export interface EstateAgentInfo {
  name: string;
  phone: string;
  role: UserRole;
  username: string;
  _id?: string;
  email?: string;
  avatar?: string;
  birthday?: string;
}

// Информация о собственнике объекта, нужна только для сотрудников
export interface OwnerInfo {
  ownerName: string;
  ownerPhone: string;
  description?: string;
  apartmentNumber?: string; // номер квартиры
  entranceNumber?: string; // номер подъезда
  intercomNumber?: string; // номер домофона
  ownerComment?: string;
}

export interface ApartmentComplex {
  title: string;
}

export type SourceCustomerType =
  | "roze"
  | "krisha"
  | "instagram"
  | "tiktok"
  | "other";

export type DealOwnerType = "agency" | "owner" | "other";

export type FormFieldsType =
  | BasicObject
  | Apartment
  | House
  | Flat
  | Land
  | Business;

export interface EstateObject extends Apartment, House, Flat, Land, Business {
  _id: string;
}

export type DisplayEstateObject = Omit<
  EstateObject,
  "estateAgent" | "images"
> & {
  estateAgent: EstateAgentInfo | null;
  images: ObjectImages[];
  updatedAt: string;
  sourceCustomer?: SourceCustomerType;
  dealOwner?: DealOwnerType;
};

export interface BasicObject {
  category: CategoryType;
  visibilityStatus: VisibilityStatusType;
  type: ServiceType;
  price: number | null;
  soldPrice?: number | null;
  discount?: number | null;
  description: string;
  images?: FileList | [];
  existingImages?: ObjectImages[];
  videoLink?: string;
  tiktokLink?: string;
  estateAgent?: string;
  isCommercial: boolean;
  exchange: ExchangeType | "";
  mortgage: MortgageType | "";
  pledge: PledgeType | "";
  documents: DocumentsType | "";
  geoPosition: GeoPositionInfo;
  ownerInfo: OwnerInfo;
  apartmentComplex?: ApartmentComplex;
}

export interface Apartment extends BasicObject {
  roomCount: number | null; // Количество комнат
  houseBuildingYear?: number | null; // Год постройки
  houseSquare: number | null; // Площадь общая
  kitchenSquare?: number | null; // Площадь кухни
  countFloor?: number | null; // Количество этажей в квартире/доме (бывают двухэтажные квартиры, трех этажные котеджи и т.д.)
  ceilingHeight?: number | null; // Высота потолков
  toiletCount?: number | null; // Количество сан.узлов
  houseCondition?: HouseConditionType | ""; // Состояние дома
  houseWallMaterial?: HouseWallMaterialType | ""; // Материал стен
  houseRoofMaterial?: HouseRoofMaterialType | ""; // Материал крыши
  furniture?: FurnitureType | ""; // Мебелирован ли?
  ethernet?: EthernetType | ""; // Интернет
  garage?: GarageType | ""; // Гараж: На одну машину, На две машины, Есть
  parkingSeat: number | null; // Количество парковочных мест
}

// Только в доме
export interface House extends Apartment {
  plotSquare?: string | null; // Площадь/количество соток земли у дома
  hasBasement?: boolean; // Есть/нет цокольный этаж
  hasMansard?: boolean; // Есть/нет мансарда
  houseType?: HouseType | ""; // Тип дома, бывает что в одном доме два хозяина, поделен по-полам;
  electricType?: ElectricType | "";
  heatingType?: HeatingType | "";
  gasType?: GasType | "";
  sewerType?: SewerType | "";
  toiletType?: ToiletType | "";
  waterType?: WaterType | "";
}
// Только в квартире
export interface Flat extends Apartment {
  targetFloor?: number | null; // Этаж, на котором находится объект
  totalFloor?: number | null; // Общее количество этажей в здании
  notFirstFloor?: boolean;
  notLastFloor?: boolean;
}

export interface Land extends BasicObject {
  landSquare: string; // Площадь земли
}

export interface Business extends BasicObject {
  businessType: BusinessType | "";
}

export interface Townhouse extends BasicObject {}
export interface Commercial extends BasicObject {}
export interface Factory extends BasicObject {}
export interface OtherObject extends BasicObject {}

export interface FormFieldsData extends BasicObject {}
