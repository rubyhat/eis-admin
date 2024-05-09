import React from "react";
import { Box } from "@mui/material";
import { SoldButtonDrawer } from "./components/SoldButtonDrawer";
import { DrawerSoldPrice } from "./components/DrawerSoldPrice";

export const DrawerSoldEstateModule = () => {
  return (
    <Box>
      <SoldButtonDrawer />
      <DrawerSoldPrice />
    </Box>
  );
};
