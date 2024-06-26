import React from "react";
import { Grid } from "@mui/material";

import { useFeedbackOrdersStore } from "../../store";
import { FeedbackOrderCard } from "../FeedbackOrderCard";

export const FeedbackOrderList = () => {
  const { orders } = useFeedbackOrdersStore((store) => store);
  return (
    <Grid container spacing={2}>
      {orders.map((order) => (
        <Grid key={order._id} item xs={12} md={6}>
          <FeedbackOrderCard order={order} />
        </Grid>
      ))}
    </Grid>
  );
};
