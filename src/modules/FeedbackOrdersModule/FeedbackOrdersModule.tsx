import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import { FeedbackOrderList } from "./components/FeedbackOrderList";
import { FeedbackOrderFilterForm } from "./components/FeedbackOrderFilterForm";
import { FeedbackOrderFilterMobileWrapper } from "./components/FeedbackOrderFilterMobileWrapper";

export const FeedbackOrdersModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Заявки на недвижимость
          </Typography>
          <FeedbackOrderFilterMobileWrapper />
        </Grid>
        <Grid item xs={12} lg={8}>
          <FeedbackOrderList />
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
