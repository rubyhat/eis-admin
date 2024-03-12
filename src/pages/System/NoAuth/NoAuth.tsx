import { Grid, Typography, Box, Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export const NoAuth = () => {
  return (
    <Box className="section">
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography
              component="h2"
              variant="titleFirstRegular"
              marginBottom={2}
            >
              Необходимо авторизоваться (401)
            </Typography>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                variant="titleThirdEmphasized"
                marginBottom={1}
              >
                Что случилось?
              </Typography>
              <Typography component="p" variant="textBodyRegular">
                Вы попали на страницу, доступ к которой есть только у
                авторизованных пользователей
              </Typography>
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                variant="titleThirdEmphasized"
                marginBottom={1}
              >
                Что делать?
              </Typography>
              <Typography component="p" variant="textBodyRegular">
                Для просмотра данной страницы необходимо{" "}
                <Typography
                  variant="textBodyRegular"
                  color="customColors.colorsOrange"
                  sx={{ textDecoration: "underline" }}
                  component={Link}
                  to="/login"
                >
                  войти в систему
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
