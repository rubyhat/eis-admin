import { useQuery } from "@tanstack/react-query";
import React from "react";
import { apiUsersModule } from "../../api";
import { UserCard } from "../UserCard";
import { Alert, Grid } from "@mui/material";
import { UserCardSkeleton } from "../UserCardSkeleton";

export const UserList = () => {
  const {
    data: usersData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () => apiUsersModule.fetchAllUsers(),
    queryKey: ["usersItems"],
  });

  if (isLoading) {
    return (
      <>
        {Array.from(new Array(5)).map((_, index) => (
          <Grid item xs={12} md={4} key={index}>
            <UserCardSkeleton />
          </Grid>
        ))}
      </>
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
    <>
      {isSuccess &&
        usersData &&
        usersData.map((user) => (
          <Grid item xs={12} md={4} key={user.username}>
            <UserCard user={user} />
          </Grid>
        ))}
    </>
  );
};
