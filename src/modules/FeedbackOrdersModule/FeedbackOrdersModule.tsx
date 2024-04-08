import React from "react";
import { Alert, Badge, Box, Container, Grid, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { FeedbackOrderList } from "./components/FeedbackOrderList";
import { FeedbackOrderFilterForm } from "./components/FeedbackOrderFilterForm";
import { FeedbackOrderFilterMobileWrapper } from "./components/FeedbackOrderFilterMobileWrapper";
import { apiFeedbackOrdersModule } from "./api/apiFeedbackOrdersModule";
import { useFeedbackOrdersStore } from "./store";
import { FeedbackOrderCardSkeleton } from "./components/FeedbackOrderCardSkeleton";

export const FeedbackOrdersModule = () => {
  const searchParams = new URLSearchParams(location.search);
  const { setOrders } = useFeedbackOrdersStore((state) => state);

  const {
    data: FeedbacksData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () =>
      apiFeedbackOrdersModule.fetchFeedbacks(searchParams.toString()),
    queryKey: ["feedbackOrders"],
  });

  React.useEffect(() => {
    if (isSuccess && !isError) {
      setOrders(FeedbacksData);
    }
  }, [FeedbacksData, isError, isSuccess, setOrders]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Заявки на недвижимость
            <Badge
              color="primary"
              badgeContent={FeedbacksData?.length || "0"}
              sx={{ marginLeft: 2, marginBottom: 2 }}
            />
          </Typography>
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
