import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { UserList } from "./components/UserList";

export const UsersModule = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        <UserList />
      </Grid>
    </Container>
  );
};
