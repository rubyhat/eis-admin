import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FaqAccordion } from "./components/FaqAccordion";
import { useHelpDetailsStore } from "./store";
import { initialState } from "./store/initialState";

const url = window.location.href.split("/");
const page = url[url.length - 1] as keyof typeof initialState;

export const HelpDetailsModule = () => {
  const state = useHelpDetailsStore((state) => state);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            {state[page].title}
          </Typography>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
            marginBottom={1}
          >
            {state[page].subtitle}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FaqAccordion faqItems={state[page].faqItems} />
        </Grid>
      </Grid>
    </Container>
  );
};
