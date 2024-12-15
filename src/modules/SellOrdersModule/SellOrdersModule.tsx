import React from "react";

import { Container, Grid } from "@mui/material";

import { useFetchAllSellOrders } from "./hooks";
import { TitleWithCounter } from "../../shared/components/TitleWithCounter";
import { AxiosErrorAlertMessage } from "../../shared/components/AxiosErrorAlertMessage";
import { SellOrdersCardList } from "./components/SellOrdersCardList";

export const SellOrdersModule = () => {
  const {
    data: sellOrdersData,
    isLoading,
    isSuccess,
    error,
  } = useFetchAllSellOrders();

  return (
    <Container maxWidth={false}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleWithCounter count={sellOrdersData?.length || "0"} />
        </Grid>
        <Grid item xs={12} lg={9}>
          {/* todo: create loading spinner */}
          {isLoading && "Loading..."}
          {error && <AxiosErrorAlertMessage error={error} />}
          {isSuccess && sellOrdersData && (
            <SellOrdersCardList sellOrdersData={sellOrdersData} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
