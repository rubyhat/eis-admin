import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { UserList } from "./components/UserList";

export const UsersModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Пользователи EIS
          </Typography>
        </Grid>
        <UserList />
      </Grid>
    </Container>
  );
};
