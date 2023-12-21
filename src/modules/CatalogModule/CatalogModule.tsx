import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { CatalogObjectives } from "./components/CatalogObjectives";
import { CatalogSortGroup } from "./components/CatalogSortGroup";

export const CatalogModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            width={1}
            display="flex"
            justifyContent="space-between"
            sx={{
              alignItems: {
                xs: "flex-start",
                sm: "flex-end",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Box width={1}>
              <Typography
                component="h2"
                variant="titleFirstRegular"
                marginBottom={2}
              >
                Список всех объектов
              </Typography>
              <CatalogSortGroup />
            </Box>
            {/* <FilterMobileWrapper /> */}
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <CatalogObjectives />
        </Grid>
        <Grid item xs={12} md={4}></Grid>
      </Grid>
    </Container>
  );
};
