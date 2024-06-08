import { Badge, Container, Grid, Typography } from "@mui/material";
import React from "react";

export const SellOrdersModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Заявки на покупку
            <Badge
              color="primary"
              badgeContent={"0"}
              sx={{ marginLeft: 2, marginBottom: 2 }}
            />
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};
