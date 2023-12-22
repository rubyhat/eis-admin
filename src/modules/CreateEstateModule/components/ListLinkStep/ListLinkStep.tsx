import { Box, Typography } from "@mui/material";
import React from "react";
import { LinkCard } from "../LinkCard";
import { CustomButton } from "../../../../components/CustomButton";

export const ListLinkStep = () => {
  return (
    <Box>
      <Typography>Выберите целевое назначение</Typography>
      <LinkCard />
      <Box>
        <CustomButton>Назад</CustomButton>
        <CustomButton>Дальше</CustomButton>
      </Box>
    </Box>
  );
};
