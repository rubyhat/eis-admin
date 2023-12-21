import { Box, BoxProps } from "@mui/material";
import React from "react";

export const CustomHr = ({ sx }: BoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "1px",
        borderRadius: 2,
        backgroundColor: "customColors.labelsQuaternary",
        margin: "16px 0",
        ...sx,
      }}
    />
  );
};
