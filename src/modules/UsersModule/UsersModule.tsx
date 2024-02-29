import { Box, Grid, Typography, Container } from "@mui/material";
import React from "react";
import { UserList } from "./components/UserList";
import { CustomButton } from "../../components/CustomButton";
import { useNavigate } from "react-router";
import { useUserStore } from "../UserModule/store/useUserStore";

export const UsersModule = () => {
  const navigate = useNavigate();
  const { isAdmin } = useUserStore();

  const handleClickNewUserButton = () => navigate("/users/create");
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography component="h1" variant="titleFirstRegular">
              Сотрудники
            </Typography>
            {isAdmin && (
              <CustomButton
                size="small"
                sx={{ marginLeft: 2 }}
                onClick={handleClickNewUserButton}
              >
                + Новый
              </CustomButton>
            )}
          </Box>
        </Grid>
        <UserList />
      </Grid>
    </Container>
  );
};
