import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { UserCreateForm } from "../UserCreateModule/components/UserCreateForm";
import { Link, useLocation } from "react-router-dom";

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
            <UserCreateForm
              editUserData={location.state?.editUserData || null}
            />
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
                  color: "customColors.colorsBlue",
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
