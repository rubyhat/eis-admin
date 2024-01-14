import { Box, Typography } from "@mui/material";
import React from "react";
import { CatalogSortButtons } from "../CatalogSortButtons";

export const CatalogSortGroup = () => {
  return (
    <Box
      display="flex"
      sx={{
        alignItems: { xs: "flex-start", md: "center" },
        flexDirection: { xs: "column", md: "row" },
        maxWidth: 1,
        overflow: "hidden",
        overflowX: "scroll",
        paddingBottom: { xs: 1.5, sm: 0 },
      }}
    >
      <Typography
        component="p"
        variant="titleThirdRegular"
        sx={{
          marginRight: 2,
          display: {
            xs: "none",
            md: "inherit",
          },
        }}
      >
        Сортировать:
      </Typography>
      <CatalogSortButtons />
    </Box>
  );
};
