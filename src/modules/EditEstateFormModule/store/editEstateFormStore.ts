import { create } from "zustand";
import {
  Apartment,
  Flat,
  FormFieldsData,
  House,
  Land,
} from "../../../shared/interfaces/EstateObjectTypes";
import { FormFieldsDataInitial } from "../../../shared/constants/FormFieldsDataInitital";

interface EditEstateForm {
  formFieldsData: FormFieldsData | Apartment | House | Flat | Land;
  setFormFieldsData: (
    v: FormFieldsData | Apartment | House | Flat | Land,
  ) => void;
}

export const useEditEstateFormStore = create<EditEstateForm>((set) => ({
  formFieldsData: FormFieldsDataInitial,
  setFormFieldsData: (v) => set({ formFieldsData: v }),
}));
