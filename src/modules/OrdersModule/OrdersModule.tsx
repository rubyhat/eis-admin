import { Container, Grid } from "@mui/material";
import React from "react";
import { OrderCardList } from "./components/OrderCardList";
import { OrdersModuleTitle } from "./components/OrdersModuleTitle";

export const OrdersModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <OrdersModuleTitle />
        <OrderCardList />
      </Grid>
    </Container>
  );
};
