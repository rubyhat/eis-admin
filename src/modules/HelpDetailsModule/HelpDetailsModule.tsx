import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FaqAccordion } from "./components/FaqAccordion";

export const HelpDetailsModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Объекты недвижимости
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FaqAccordion />
        </Grid>
      </Grid>
    </Container>
  );
};
