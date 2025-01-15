import { SellOrderStatusEnum } from "@estate-information-system/shared-types";

export const statusColorMap: Record<SellOrderStatusEnum, string> = {
  [SellOrderStatusEnum.New]: "customColors.colorsOrange",
  [SellOrderStatusEnum.Waiting]: "customColors.colorsYellow",
  [SellOrderStatusEnum.InWork]: "customColors.colorsBlue",
  [SellOrderStatusEnum.Declined]: "customColors.colorsGreen",
  [SellOrderStatusEnum.Completed]: "customColors.colorsRed",
};

export const statusLabelMap: Record<SellOrderStatusEnum, string> = {
  [SellOrderStatusEnum.New]: "Новая",
  [SellOrderStatusEnum.Waiting]: "Ожидает встречи",
  [SellOrderStatusEnum.InWork]: "В работе",
  [SellOrderStatusEnum.Declined]: "Отклонена",
  [SellOrderStatusEnum.Completed]: "Завершена",
};
