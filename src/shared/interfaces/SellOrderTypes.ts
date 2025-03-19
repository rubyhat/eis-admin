import {
  EstateAgentInfo,
  EstateObject,
  ObjectImages,
} from "./EstateObjectTypes";
import { SellOrderStatusEnum } from "@estate-information-system/shared-types";

export type ResponseSellOrderData = Omit<
  EstateObject,
  "estateAgent" | "images"
> & {
  estateAgent: EstateAgentInfo | null;
  images: ObjectImages[];
  updatedAt: Date;
  createdAt: Date;
  status: SellOrderStatusEnum;
  declineReason?: string;
  createdObjectId?: string;
};
