import React from "react";
import { FeedbackOrder } from "../../store";
import { Box } from "@mui/material";

interface FeedbackOrderCardProps {
  order: FeedbackOrder;
}

export const FeedbackOrderCard = ({ order }: FeedbackOrderCardProps) => {
  return <Box>{order.name}</Box>;
};
