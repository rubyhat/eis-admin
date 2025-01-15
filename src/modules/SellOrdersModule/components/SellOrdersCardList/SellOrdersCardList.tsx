import React from "react";
import { Box } from "@mui/material";

import { SellOrdersCardItem } from "../SellOrdersCardItem";
import { ResponseSellOrderData } from "../../../../shared/interfaces";

interface SellOrdersCardListProps {
  sellOrdersData: ResponseSellOrderData[];
}

export const SellOrdersCardList = ({
  sellOrdersData,
}: SellOrdersCardListProps) => {
  return (
    <Box
      sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", width: 1 }}
    >
      {sellOrdersData.map((order) => (
        <SellOrdersCardItem key={order._id} order={order} />
      ))}
    </Box>
  );
};
