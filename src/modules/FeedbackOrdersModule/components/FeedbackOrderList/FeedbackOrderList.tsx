import React from "react";
import { useFeedbackOrdersStore } from "../../store";
import { Container, Grid } from "@mui/material";
import { FeedbackOrderCard } from "../FeedbackOrderCard";

export const FeedbackOrderList = () => {
  const { orders } = useFeedbackOrdersStore((store) => store);
  return (
    <Container>
      <Grid container spacing={2}>
        {orders.map((order) => (
          <Grid key={order._id} item xs={12} lg={4}>
            <FeedbackOrderCard order={order} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
