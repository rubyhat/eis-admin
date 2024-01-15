import { create } from "zustand";

export interface CustomerStore {}

export const useCustomerStore = create<CustomerStore>(() => ({}));
