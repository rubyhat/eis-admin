import { Box } from "@mui/material";
import React from "react";
import { FilterForm } from "./components/FilterForm";

export const FilterModule = () => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow:
          "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",
        height: "fit-content",
      }}
    >
      <FilterForm />
    </Box>
  );
};
