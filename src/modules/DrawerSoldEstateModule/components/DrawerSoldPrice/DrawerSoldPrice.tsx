import React from "react";

import { Box, SwipeableDrawer, Typography } from "@mui/material";

import { CustomHr } from "../../../../components/CustomHr";
import { useScreenSize } from "../../../../hooks/useScreenSize";
import { useDrawerSoldEstateStore } from "../../store/useDrawerSoldEstateStore";
import { DrawerSoldForm } from "../DrawerSoldForm";
import { useEstateDetailsStore } from "../../../EstateDetailsModule/store";

export const DrawerSoldPrice = () => {
  const { isMobile } = useScreenSize();
  const { isDrawerOpen, setIsDrawerOpen } = useDrawerSoldEstateStore();
  const { estateDetails } = useEstateDetailsStore();

  const handleCloseDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(false);
  };

  const titleLabel = estateDetails?.type === "rent" ? "аренды" : "продажи";
  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "top"}
      open={isDrawerOpen}
      onClose={handleCloseDrawer}
      onOpen={() => setIsDrawerOpen(true)}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : "600px",
          borderRadius: isMobile ? "8px 8px 0 0" : 2,
          margin: isMobile ? "inherit" : "10% auto",
        },
      }}
    >
      <Box sx={{ padding: "24px 16px" }}>
        <Typography component="h6" variant="titleThirdRegular">
          Итоговая сумма {titleLabel}
        </Typography>
        <CustomHr />
        <DrawerSoldForm />
      </Box>
    </SwipeableDrawer>
  );
};
