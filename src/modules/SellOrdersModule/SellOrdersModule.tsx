import React from "react";

import { Alert, Box, CircularProgress, Container, Grid } from "@mui/material";

import { useFetchAllSellOrders } from "./hooks";
import { TitleWithCounter } from "../../shared/components/TitleWithCounter";
import { AxiosErrorAlertMessage } from "../../shared/components/AxiosErrorAlertMessage";
import { SellOrdersCardList } from "./components/SellOrdersCardList";
import { SellOrdersStatusBar } from "./components/SellOrdersStatusBar";

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
          <TitleWithCounter
            text="Заявки на продажу"
            count={sellOrdersData?.length || "0"}
          />
        </Grid>
        <Grid item xs={12}>
          <SellOrdersStatusBar isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} lg={12}>
          {isLoading && (
            <Box px={4}>
              <CircularProgress color="primary" size={24} />
            </Box>
          )}
          {error && <AxiosErrorAlertMessage error={error} />}
          {isSuccess && sellOrdersData && (
            <SellOrdersCardList sellOrdersData={sellOrdersData} />
          )}
          {isSuccess && sellOrdersData.length === 0 && (
            <Alert severity="success" sx={{ width: "fit-content" }}>
              Все заявки с этим статусом обработаны, новых еще не появилось 🥳
            </Alert>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
