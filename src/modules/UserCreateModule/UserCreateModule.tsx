import { Container, Grid } from "@mui/material";
import React from "react";
import { UserCreateForm } from "./components/UserCreateForm";

export const UserCreateModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <UserCreateForm />
        </Grid>
      </Grid>
    </Container>
  );
};
