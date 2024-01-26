import { create } from "zustand";
import { HouseConditionType } from "../../../shared/interfaces/EstateObjectTypes";

export interface CustomerFormFields {
  firstname: string; // Имя
  lastname: string; // Фамилия
  phone: string; // Телефон
  description: string; // Текстареа, заметки/описание запроса
  // Хар-ки недвижимости
  roomCount: string; // Количество комнат
  city: string; // Город
  priceStart: number; // Цена от
  priceEnd: number; // Цена до
  houseCondition: HouseConditionType; // Состояние недвижимости
}

// Как вариант отображать только количество, а если нужно их посмотреть, то могу использовать хар-ки недвижимости, чтобы открыть /catalog и передать значения в фильтр
export interface Customer extends CustomerFormFields {
  estateMatchCount: number; // Количество подходящих объектов под запрос этого клиента
}

export interface CustomerStore {}

export const useCustomerStore = create<CustomerStore>(() => ({}));
