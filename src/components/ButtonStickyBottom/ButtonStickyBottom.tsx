import { Box } from "@mui/material";
import React from "react";
import { CustomButton } from "../CustomButton";

interface ButtonStickyBottomProps {
  children: React.ReactNode;
  onClick: () => void;
}

export const ButtonStickyBottom = ({
  children,
  onClick,
}: ButtonStickyBottomProps) => {
  return (
    <Box
      sx={{
        display: {
          xs: "inherit",
          md: "none",
        },
        position: "fixed",
        bottom: 0,
        left: 0,
        width: 1,
        padding: 2,
      }}
    >
      <CustomButton fullWidth size="large" onClick={() => onClick()}>
        {children}
      </CustomButton>
    </Box>
  );
};
