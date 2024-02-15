import { create } from "zustand";
import {
  Apartment,
  Flat,
  FormFieldsData,
  House,
  Land,
} from "../../../shared/interfaces/EstateObjectTypes";
import { FormFieldsDataInitial } from "../constants/FormFieldsDataInitital";

interface CreateEstateForm {
  formFieldsData: FormFieldsData | Apartment | House | Flat | Land;
  setFormFieldsData: (
    v: FormFieldsData | Apartment | House | Flat | Land,
  ) => void;
}

export const useCreateEstateFormStore = create<CreateEstateForm>((set) => ({
  formFieldsData: FormFieldsDataInitial,
  setFormFieldsData: (v) => set({ formFieldsData: v }),
}));
