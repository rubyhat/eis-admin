import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";
import { Box, Chip, IconButton, Typography } from "@mui/material";

import { ResponseSellOrderData } from "../../../../shared/interfaces";
import {
  sellOrderCardChipStyles,
  sellOrderCardStyles,
  sellOrderChipWrapperStyles,
} from "./styles";
import { SellOrdersCardInfoBlock } from "../SellOrdersCardInfoBlock";
import { useFormatDate } from "../../../../shared/hooks";
import { useDeleteSellOrderByIdMutation } from "../../../../shared/hooks/Orders/SellOrders";
import { SellOrderStatusDisplayTextEnum } from "@estate-information-system/shared-types";

interface SellOrdersCardItemParams {
  order: ResponseSellOrderData;
}

export const SellOrdersCardItem = ({ order }: SellOrdersCardItemParams) => {
  const navigate = useNavigate();
  const { fullDate, time } = useFormatDate(order.createdAt);
  const deleteSellOrderMutation = useDeleteSellOrderByIdMutation();

  return (
    <Box
      sx={sellOrderCardStyles(order.status)}
      onClick={() =>
        navigate("/orders/sell/" + order._id, { state: { order } })
      }
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={sellOrderChipWrapperStyles}>
          <Chip
            label={SellOrderStatusDisplayTextEnum[order.status]}
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
      <Typography
        component="p"
        variant="titleThirdRegular"
        color="customColors.labelsPrimary"
        mt={2}
      >
        Комментарий от клиента:
      </Typography>
      <Typography component="p" variant="textBodyRegular">
        {order.ownerInfo.ownerComment ||
          "Клиент не оставил комментарий при подаче заявки."}
      </Typography>
    </Box>
  );
};
