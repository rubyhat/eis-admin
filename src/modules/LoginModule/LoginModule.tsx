import { Container, Grid } from "@mui/material";
import React from "react";
import { LoginForm } from "./components/LoginForm";
import useTitle from "../../hooks/useTitle";
import { useLoginStore } from "./store";

export const LoginModule = () => {
  useTitle("Авторизация");
  const { setIsAuth } = useLoginStore((state) => state);

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const params = Object.fromEntries(searchParams.entries());

    if (params.from && params.from === "logout") setIsAuth(false);
  }, [setIsAuth]);

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
