import React from "react";
import { Box, Typography } from "@mui/material";

import { DisplayEstateObject } from "../../../../shared/interfaces";
import { estateObjectDictionary } from "../../../../shared/dictionaries/EstateObjectDictionary";
import { TbCurrencyTenge } from "react-icons/tb";
import { usePriceNormalize } from "../../../../hooks/usePriceNormalize";

interface SellOrdersCardItemParams {
  order: DisplayEstateObject;
}

export const SellOrdersCardItem = ({ order }: SellOrdersCardItemParams) => {
  return (
    <Box>
      <Typography
        component="p"
        variant="textBodyRegular"
        color="customColors.labelsPrimary"
      >
        {order.geoPosition.street}, {order.geoPosition.houseNumber}
      </Typography>
      <Typography
        component="p"
        variant="textSubheadlineRegular"
        color="customColors.labelsSecondary"
        sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
      >
        {estateObjectDictionary.category[order.category]} | Комнат:{" "}
        {order.roomCount} | Площадь: {order.houseSquare} м² |{" "}
        <TbCurrencyTenge size={16} />{" "}
        {usePriceNormalize(order.price || 0, order.discount || 0).totalPrice}
      </Typography>
    </Box>
  );
};
