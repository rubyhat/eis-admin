import { Alert, Badge, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { OrdersList } from "./components/OrdersList";
import { useQuery } from "@tanstack/react-query";
import { apiSellOrdersModule } from "./api/apiSellOrdersModule";
import { SellOrderCardSkeleton } from "./components/SellOrderCardSkeleton";

export const SellOrdersModule = () => {
  const {
    data: SellsData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () => apiSellOrdersModule.fetchSells(""),
    queryKey: ["sellOrders"],
  });

  React.useEffect(() => console.log("SellsData", SellsData), [SellsData]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Заявки на покупку
            <Badge
              color="primary"
              badgeContent={"0"}
              sx={{ marginLeft: 2, marginBottom: 2 }}
            />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          Toolbar
        </Grid>
        <Grid item xs={12}>
          {isSuccess && Boolean(!SellsData.length) && (
            <Alert severity="info">
              Список заявок пуст. Если так быть не должно, проверьте фильтры или
              обратитесь в техническую поддержку!
            </Alert>
          )}
          {isLoading &&
            Array.from(new Array(3)).map((_, index) => (
              <SellOrderCardSkeleton key={index} />
            ))}
          {isError && (
            <Alert severity="warning">
              Произошла ошибка во время запроса данных с сервера! Пожалуйста,
              обратитесь в техническую поддержку!
            </Alert>
          )}
          {isSuccess && Boolean(SellsData.length) && <OrdersList />}
        </Grid>
      </Grid>
    </Container>
  );
};
