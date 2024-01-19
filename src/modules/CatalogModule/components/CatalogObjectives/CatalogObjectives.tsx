import { Box } from "@mui/material";
import React from "react";
import { CatalogCard } from "../CatalogCard";
import { useCatalogStore } from "../../store";

export const CatalogObjectives = () => {
  const { estateObjects } = useCatalogStore((state) => state);

  return (
    <Box
      component="ul"
      sx={{
        border: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: 2,
      }}
    >
      {estateObjects.map((item, index) => (
        <CatalogCard key={index} item={item} />
      ))}
    </Box>
  );
};
