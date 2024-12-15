import React from "react";
import { Container, Grid } from "@mui/material";

import { SellOrdersCardItem } from "../SellOrdersCardItem";
import { DisplayEstateObject } from "../../../../shared/interfaces";

interface SellOrdersCardListProps {
  sellOrdersData: DisplayEstateObject[];
}

export const SellOrdersCardList = ({
  sellOrdersData,
}: SellOrdersCardListProps) => {
  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        {sellOrdersData.map((order) => (
          <Grid item xs={12} lg={4}>
            <SellOrdersCardItem key={order._id} order={order} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
