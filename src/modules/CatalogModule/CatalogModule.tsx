import { Container, Grid } from "@mui/material";
import React from "react";
import { CatalogObjectives } from "./components/CatalogObjectives";

export const CatalogModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={8}>
          <CatalogObjectives />
        </Grid>
        <Grid item md={4}></Grid>
      </Grid>
    </Container>
  );
};
