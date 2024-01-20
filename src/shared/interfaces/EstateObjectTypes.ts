export type CategoryType =
  | "apartment"
  | "house"
  | "land"
  | "cottage"
  | "business"
  | "factory"
  | "other"; // Категория: квартира, дом, земельный участок, коммерческая недвижимость, бизнес, завод, другое
export type ServiceType = "sell" | "rent"; // Продажа или аренда
export type VisibilityStatusType = "active" | "sold" | "canceled" | "checking"; // Активен, Продан, Отменен, На проверке, на клиенте показываем только Активные
export type HouseConditionType = "perfect" | "good" | "bad" | "free" | "build"; // Хорошее, среднее, требует ремонта, свободная планировка, черновая отделка / евроремонт - косметический ремонт - без ремонта - предчистовая
export type HouseType = "part" | "full" | "other"; // Часть дома, Целый дом, Другое
export type FurnitureType = "part" | "full" | "none"; // Мебелирован: частично, полностью, без мебели
export type ElectricType = "part" | "full" | "none"; // Электричество: частично, есть, нет
export type HeatingType = "central" | "gas" | "solid" | "liquid" | "none"; // Отопление: Центральное, на газу, на угле, на бензине, нет
export type GasType = "central" | "auto" | "canConnect" | "none"; // Газ: центральный, автономный, есть возможность подключить, нет
export type SewerType = "central" | "septik" | "canConnect" | "none"; // Канализация: центральная, септик, можно подключить, нет
export type ToiletType = "in" | "out" | "none"; // Туалет: в доме, на улице, нет
export type WaterType = "central" | "borehole" | "canConnect" | "none"; // Вода: центральная, скважина, можно подключить, нет
export type EthernetType = "connected" | "toConnect" | "none";
export type HouseWallMaterialType =
  | "brick" // Кирпич
  | "wood" // Дерево
  | "gasSilicateBlock" // Газосиликатный блок
  | "cinderBlock" // Шлакоблок
  | "heatBlock" // Теплоблок
  | "panel" // Каркасно-щитовой
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

export interface GeoPositionInfo {
  city: string; // Город
  street: string; // Улица
  houseNumber: number | null; // Номер дома
  isInfoHidden: boolean; // Свитчер для сокрытия адреса
  mapLink: string; // Ссылка на 2гис
}
