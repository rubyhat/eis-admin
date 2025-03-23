import { SellOrderStatusEnum } from "@estate-information-system/shared-types";

export const statusColorMap: Record<SellOrderStatusEnum, string> = {
  [SellOrderStatusEnum.NEW]: "customColors.colorsOrange",
  [SellOrderStatusEnum.WAITING]: "customColors.colorsYellow",
  [SellOrderStatusEnum.IN_WORK]: "customColors.colorsBlue",
  [SellOrderStatusEnum.DECLINED]: "customColors.colorsRed",
  [SellOrderStatusEnum.COMPLETED]: "customColors.colorsGreen",
  [SellOrderStatusEnum.CANCELED]: "customColors.colorsRed",
  [SellOrderStatusEnum.FALSE_ORDER]: "customColors.colorsRed",
};
