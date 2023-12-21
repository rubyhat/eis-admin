import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { CatalogObjectives } from "./components/CatalogObjectives";
import { CatalogSortGroup } from "./components/CatalogSortGroup";
import { FilterMobileWrapper } from "../FilterModule/components/FilterMobileWrapper";
import { FilterModule } from "../FilterModule";

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
            <FilterMobileWrapper />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <CatalogObjectives />
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          sx={{ display: { xs: "none", md: "inherit" } }}
        >
          <Box>
            <FilterModule />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
