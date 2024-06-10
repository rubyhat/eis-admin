import {
  ApartmentComplex,
  CategoryType,
  DocumentsType,
  ElectricType,
  EthernetType,
  FurnitureType,
  GarageType,
  GasType,
  GeoPositionInfo,
  HeatingType,
  HouseConditionType,
  HouseRoofMaterialType,
  HouseType,
  HouseWallMaterialType,
  OwnerInfo,
  PledgeType,
  ServiceType,
  SewerType,
  ToiletType,
  WaterType,
} from "../../../shared/interfaces/EstateObjectTypes";

export interface SellOrder {
  apartmentComplex: ApartmentComplex;
  type: ServiceType;
  ownerInfo: OwnerInfo;
  geoPosition: GeoPositionInfo;
  category: CategoryType;
  price: number;
  exchange: string;
  ownerComment: string;
  houseSquare: number;
  kitchenSquare: string;
  targetFloor: string;
  totalFloor: string;
  ceilingHeight: string;
  houseBuildingYear: string;
  roomCount: number;
  pledge: PledgeType;
  documents: DocumentsType;
  houseCondition: HouseConditionType;
  houseWallMaterial: HouseWallMaterialType;
  houseRoofMaterial: HouseRoofMaterialType;
  furniture: FurnitureType;
  ethernet: EthernetType;
  garage: GarageType;
  toiletCount: ToiletType;
  parkingSeat: string;
  apartmentComplexTitle: string;
  plotSquare: string;
  houseType: HouseType;
  electricType: ElectricType;
  heatingType: HeatingType;
  gasType: GasType;
  sewerType: SewerType;
  toiletType: ToiletType;
  waterType: WaterType;
  hasBasement: boolean;
  hasMansard: boolean;
  entranceNumber: string;
  intercomNumber: string;
  photos: File[];
}

export interface SellOrderDisplay extends SellOrder {
  _id: string;
}
