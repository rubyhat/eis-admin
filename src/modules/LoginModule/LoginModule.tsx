import { Container, Grid } from "@mui/material";
import React from "react";
import { LoginForm } from "./components/LoginForm";
import useTitle from "../../hooks/useTitle";

export const LoginModule = () => {
  useTitle("Авторизация");
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <LoginForm />
        </Grid>
      </Grid>
    </Container>
  );
};
