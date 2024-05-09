import React from "react";

import { CustomButton } from "../../../../components/CustomButton";
import { useDrawerSoldEstateStore } from "../../store/useDrawerSoldEstateStore";
import { useEstateDetailsStore } from "../../../EstateDetailsModule/store";

export const SoldButtonDrawer = () => {
  const { setIsDrawerOpen } = useDrawerSoldEstateStore((state) => state);
  const { estateDetails } = useEstateDetailsStore();

  const handleClickSoldButton = () => setIsDrawerOpen(true);

  const buttonLabel =
    estateDetails?.type === "rent" ? "Сдано в аренду!" : "Продано!";
  return (
    <CustomButton size="medium" fullWidth onClick={handleClickSoldButton}>
      {buttonLabel}
    </CustomButton>
  );
};
