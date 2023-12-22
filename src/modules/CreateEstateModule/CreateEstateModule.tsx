import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { ListLinkStep } from "./components/ListLinkStep";

export const CreateEstateModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <ListLinkStep />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
