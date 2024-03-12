import { CircularProgress, Container, Grid } from "@mui/material";
import React from "react";
import { EditOrderFeedbackForm } from "./components/EditOrderFeedbackForm";
import { useLocation } from "react-router-dom";

export const EditOrdersFeedbackModule = () => {
  const location = useLocation();

  // todo: check is need to clear order data
  if (location.state?.order) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={4}>
            <EditOrderFeedbackForm order={location.state.order} />
          </Grid>
        </Grid>
      </Container>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <CircularProgress />
        </Grid>
      </Grid>
    </Container>
  );
};
