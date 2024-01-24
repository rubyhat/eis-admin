import { Alert, Grid, Typography, Container } from "@mui/material";
import React from "react";
import { UserCard } from "../UsersModule/components/UserCard";
import { useLoginStore } from "../LoginModule/store";
import { useQuery } from "@tanstack/react-query";
import { apiUserModule } from "./api/apiUserModule";
import { useParams } from "react-router";
import { UserCardSkeleton } from "../UsersModule/components/UserCardSkeleton";

export const UserModule = () => {
  const { user, setUser } = useLoginStore((state) => state);
  const [userInfo, setUserInfo] = React.useState(user);
  const { id } = useParams();

  const {
    data: userData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () =>
      id ? apiUserModule.fetchUser(id) : Promise.reject("No ID provided"),
    queryKey: ["userInfo"],
    enabled: !user,
  });

  React.useEffect(() => {
    if (isSuccess) {
      setUserInfo(userData);
      setUser(userData);
    }
  }, [isSuccess, setUser, userData]);

  if (isLoading) {
    return (
      <Grid item xs={12} md={4}>
        <UserCardSkeleton />
      </Grid>
    );
  }

  if (isError) {
    return (
      <Grid item xs={12} md={4}>
        <Alert severity="error">
          Произошла ошибка! Пожалуйста, обратитесь в тех. поддержку
        </Alert>
      </Grid>
    );
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component="h1" variant="titleFirstRegular">
            Мой профиль
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          {userInfo && <UserCard user={userInfo} />}
        </Grid>
      </Grid>
    </Container>
  );
};
