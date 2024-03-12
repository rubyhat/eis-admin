import React from "react";
import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { UserEditForm } from "./components/UserEditForm";

export const UserEditModule = () => {
  const location = useLocation();
  return (
    <Container>
      <Grid container spacing={2}>
        {location.state?.editUserData ? (
          <Grid item xs={12} md={4}>
            <Typography variant="titleSecondRegular">
              Редактирование сотрудника
            </Typography>
            <UserEditForm editUserData={location.state?.editUserData || null} />
          </Grid>
        ) : (
          <Grid item xs={12} md={6}>
            <Alert severity="error">
              Данные пользователя не найдены! Вернитесь на страницу списка
              пользователей и нажмите на кнопку редактирования. Если ошибка
              повторится, пожалуйста, обратитесь в тех. поддержку!
              <Box
                component={Link}
                to="/users"
                sx={{
                  display: "flex",
                  color: "customColors.colorsOrange",
                  fontWeight: 500,
                  marginTop: 1,
                  textDecoration: "underline",
                }}
              >
                Вернуться на страницу пользователей
              </Box>
            </Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
