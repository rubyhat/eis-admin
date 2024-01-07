import { create } from "zustand";

import { initialState } from "./initialState";
export interface FaqItem {
  title: string;
  text: string;
  subtitle?: string;
}

export interface EstateFaq {
  title: string;
  subtitle?: string;
  faqItems: FaqItem[];
}

export interface HelpDetailsStore {
  estate: EstateFaq;
}

export const useHelpDetailsStore = create<HelpDetailsStore>(() => ({
  ...initialState,
}));
