import { Container, Grid, Typography } from "@mui/material";
import React from "react";
import { UserCreateForm } from "./components/UserCreateForm";

export const UserCreateModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Typography variant="titleSecondRegular">
            Создание нового сотрудника
          </Typography>
          <UserCreateForm />
        </Grid>
      </Grid>
    </Container>
  );
};
