import { Container, Grid } from "@mui/material";
import React from "react";
import { HelpCardList } from "./components/HelpCardList";

export const HelpModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <HelpCardList />
      </Grid>
    </Container>
  );
};
