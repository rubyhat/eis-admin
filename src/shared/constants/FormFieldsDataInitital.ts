import { FormFieldsType } from "../interfaces/EstateObjectTypes";

const agentFromLocalStorage = localStorage.getItem("user");
const agentObjectFromLocalStorage = agentFromLocalStorage
  ? JSON.parse(agentFromLocalStorage).id
  : "";

export const FormFieldsDataInitial: FormFieldsType = {
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
    cityRegion: "",
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

export const livingSpaces = ["apartment", "house", "cottage"];
export const houseAndCottage = ["house", "cottage"];
