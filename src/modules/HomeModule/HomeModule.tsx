import { Container, Grid } from "@mui/material";
import React from "react";
import { MenuList } from "./components/MenuList";
import useTitle from "../../hooks/useTitle";

export const HomeModule = () => {
  useTitle("Главная страница");
  return (
    <Container>
      <Grid container spacing={2}>
        <MenuList />
      </Grid>
    </Container>
  );
};
