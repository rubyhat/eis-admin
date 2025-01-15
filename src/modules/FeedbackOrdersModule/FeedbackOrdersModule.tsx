import React from "react";
import { Alert, Box, Container, Grid } from "@mui/material";

import { FeedbackOrderList } from "./components/FeedbackOrderList";
import { FeedbackOrderFilterForm } from "./components/FeedbackOrderFilterForm";
import { FeedbackOrderFilterMobileWrapper } from "./components/FeedbackOrderFilterMobileWrapper";
import { useFeedbackOrdersStore } from "./store";
import { FeedbackOrderCardSkeleton } from "./components/FeedbackOrderCardSkeleton";
import { TitleWithCounter } from "../../shared/components/TitleWithCounter";
import { useFetchAllFeedbackOrders } from "./hooks";

export const FeedbackOrdersModule = () => {
  const searchParams = new URLSearchParams(location.search);
  const { setOrders } = useFeedbackOrdersStore((state) => state);

  const {
    data: FeedbacksData,
    isLoading,
    isSuccess,
    isError,
  } = useFetchAllFeedbackOrders(searchParams.toString());

  React.useEffect(() => {
    if (isSuccess && !isError) {
      setOrders(FeedbacksData);
    }
  }, [FeedbacksData, isError, isSuccess, setOrders]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleWithCounter
            text="Заявки на покупку"
            count={FeedbacksData?.length || "0"}
          />
          <FeedbackOrderFilterMobileWrapper />
        </Grid>
        <Grid item xs={12} lg={8}>
          {isSuccess && Boolean(!FeedbacksData.length) && (
            <Alert severity="info">
              Список заявок пуст. Если так быть не должно, проверьте фильтры или
              обратитесь в техническую поддержку!
            </Alert>
          )}
          {isLoading &&
            Array.from(new Array(3)).map((_, index) => (
              <FeedbackOrderCardSkeleton key={index} />
            ))}
          {isError && (
            <Alert severity="warning">
              Произошла ошибка во время запроса данных с сервера! Пожалуйста,
              обратитесь в техническую поддержку!
            </Alert>
          )}
          {isSuccess && Boolean(FeedbacksData.length) && <FeedbackOrderList />}
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ display: { xs: "none", md: "inherit" } }}
        >
          <Box
            sx={{
              width: 1,
              borderRadius: 2,
              boxShadow:
                "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",
              height: "fit-content",
            }}
          >
            <FeedbackOrderFilterForm />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
