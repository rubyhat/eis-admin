import { FormFieldsType } from "../../../shared/interfaces/EstateObjectTypes";

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
