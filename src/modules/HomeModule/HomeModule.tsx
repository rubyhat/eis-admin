import { Container, Grid } from "@mui/material";
import React from "react";
import { MenuList } from "./components/MenuList";

export const HomeModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <MenuList />
      </Grid>
    </Container>
  );
};
