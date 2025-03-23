import React from "react";
import { Box } from "@mui/material";

import { SellOrdersCardItem } from "../SellOrdersCardItem";
import { ResponseSellOrderData } from "../../../../shared/interfaces";
import { cardListStyles } from "./styles";

interface SellOrdersCardListProps {
  sellOrdersData: ResponseSellOrderData[];
}

export const SellOrdersCardList = ({
  sellOrdersData,
}: SellOrdersCardListProps) => {
  return (
    <Box sx={cardListStyles}>
      {sellOrdersData.map((order) => (
        <SellOrdersCardItem key={order._id} order={order} />
      ))}
    </Box>
  );
};
