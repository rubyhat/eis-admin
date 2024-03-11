import React from "react";
import { Container, Grid } from "@mui/material";

import { FeedbackOrderList } from "./components/FeedbackOrderList";

export const FeedbackOrdersModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <FeedbackOrderList />
        </Grid>
        <Grid item xs={12} lg={4}>
          filters
        </Grid>
      </Grid>
    </Container>
  );
};
