import { SellOrderStatusEnum } from "@estate-information-system/shared-types";
import { statusColorMap } from "../../constants";

export const sellOrderCardStyles = (status: SellOrderStatusEnum) => {
  return {
    mr: 2,
    border: "2px solid",
    borderColor: statusColorMap[status],
    borderRadius: 2,
    p: 2,
    cursor: "pointer",
    transition: "all 333ms ease",
    "&:hover": {
      backgroundColor: "hsla(32, 100%, 55%, 0.05)",
    },
  };
};

export const sellOrderCardChipStyles = (status: SellOrderStatusEnum) => {
  return {
    backgroundColor: statusColorMap[status],
    color: status === SellOrderStatusEnum.WAITING ? "#000" : "#fff",
  };
};

export const sellOrderChipWrapperStyles = {
  display: "flex",
  alignItems: "center",
  gap: 1,
  mb: 1,
};
