import { Box } from "@mui/material";
import React from "react";
import { CatalogCard } from "../CatalogCard";

export const CatalogObjectives = () => {
  return (
    <Box
      component="ul"
      sx={{
        border: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: 2,
      }}
    >
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
      <CatalogCard />
    </Box>
  );
};
