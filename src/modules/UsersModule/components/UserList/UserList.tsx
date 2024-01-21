import { useQuery } from "@tanstack/react-query";
import React from "react";
import { apiUsersModule } from "../../api";
import { UserCard } from "../UserCard";
import { Grid } from "@mui/material";

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
      <Grid item xs={12}>
        Загрузка...
      </Grid>
    );
  }

  if (isError) {
    return (
      <Grid item xs={12}>
        Ошибка...!
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
