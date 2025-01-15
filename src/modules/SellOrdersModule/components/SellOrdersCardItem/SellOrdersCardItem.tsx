import React from "react";
import { Box, Chip, IconButton, Typography } from "@mui/material";

import { ResponseSellOrderData } from "../../../../shared/interfaces";
import {
  sellOrderCardChipStyles,
  sellOrderCardStyles,
  sellOrderChipWrapperStyles,
} from "./styles";
import { statusLabelMap } from "../../constants";
import { useFormatDate } from "../../../../shared/hooks";
import { SellOrdersCardInfoBlock } from "../SellOrdersCardInfoBlock";
import { useDeleteSellOrderByIdMutation } from "../../../../shared/hooks/Orders/SellOrders";
import { MdOutlineDelete } from "react-icons/md";

interface SellOrdersCardItemParams {
  order: ResponseSellOrderData;
}

export const SellOrdersCardItem = ({ order }: SellOrdersCardItemParams) => {
  const { fullDate, time } = useFormatDate(order.createdAt);
  const deleteSellOrderMutation = useDeleteSellOrderByIdMutation();
  return (
    <Box sx={sellOrderCardStyles(order.status)}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={sellOrderChipWrapperStyles}>
          <Chip
            label={statusLabelMap[order.status]}
            size="small"
            sx={sellOrderCardChipStyles(order.status)}
          />
          <IconButton
            size="small"
            color="error"
            onClick={() => deleteSellOrderMutation.mutate(order._id)}
          >
            <MdOutlineDelete />
          </IconButton>
        </Box>
        <Typography
          component="p"
          variant="textCalloutRegular"
          color="customColors.labelsSecondary"
        >
          {fullDate} в {time}
        </Typography>
      </Box>
      <Typography
        component="p"
        variant="titleThirdRegular"
        color="customColors.labelsPrimary"
      >
        {order.geoPosition.street}, {order.geoPosition.houseNumber}
      </Typography>
      <SellOrdersCardInfoBlock order={order} />
    </Box>
  );
};
