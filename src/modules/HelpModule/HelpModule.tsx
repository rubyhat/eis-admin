import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { HelpCardList } from "./components/HelpCardList";

export const HelpModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Центр знаний
          </Typography>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
          >
            Здесь Вы можете найти вопросы и ответы на каждый раздел
          </Typography>
        </Grid>
        <HelpCardList />
      </Grid>
    </Container>
  );
};
