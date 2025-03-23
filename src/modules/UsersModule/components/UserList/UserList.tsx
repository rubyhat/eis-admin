import { Alert, Grid } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { UserCard } from "../UserCard";
import { UserCardSkeleton } from "../UserCardSkeleton";
import { apiFetchAllUsers } from "../../../../shared/api/apiFetchAllUsers";

export const UserList = () => {
  const {
    data: usersData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () => apiFetchAllUsers.fetchAllUsers(),
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
