import { FormFieldsType } from "../interfaces/EstateObjectTypes";

const agentFromLocalStorage = localStorage.getItem("user");
const agentObjectFromLocalStorage = agentFromLocalStorage
  ? JSON.parse(agentFromLocalStorage).id
  : "";

export const FormFieldsDataInitial: FormFieldsType = {
  // basic values
  price: null,
  discount: null,
  isCommercial: false,
  images: [],
  description: "",
  videoLink: "",
  mortgage: "",
  exchange: "",
  pledge: "",
  documents: "good",
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
    cityRegion: "",
  },
  ownerInfo: {
    ownerName: "",
    ownerPhone: "",
    description: "",
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
  garage: "",
  parkingSeat: null,

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

export const livingSpaces = ["apartment", "house", "cottage", "townhouse"];
export const houseAndCottage = ["house", "cottage"];
