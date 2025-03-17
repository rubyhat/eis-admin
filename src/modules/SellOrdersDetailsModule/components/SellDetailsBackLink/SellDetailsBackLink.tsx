import React from "react";
import { Link } from "react-router-dom";
import { Box, Chip, Typography } from "@mui/material";
import { MdArrowCircleLeft } from "react-icons/md";
import {
  SellOrderStatusEnum,
  SellOrderStatusDisplayTextEnum,
  SellOrderStatusColorSchemaConst,
} from "@estate-information-system/shared-types";

import { linkStyles } from "./styles";

interface SellDetailsBackLinkProps {
  id: string;
  currentStatus: SellOrderStatusEnum;
}

export const SellDetailsBackLink = ({
  id,
  currentStatus,
}: SellDetailsBackLinkProps) => {
  return (
    <Box>
      <Box component={Link} to="/orders/sell" sx={linkStyles}>
        <MdArrowCircleLeft size={24} color="hsla(32, 100%, 55%, 1)" />
        Вернуться к заявкам
      </Box>
      <Typography component="h1" variant="titleFirstRegular">
        Заявка № {id}{" "}
        <Chip
          label={SellOrderStatusDisplayTextEnum[currentStatus]}
          color={SellOrderStatusColorSchemaConst[currentStatus]}
        />
      </Typography>
    </Box>
  );
};
