import { Box, Container, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
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
              Страница не найдена (404)
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
                Вы попали на страницу, которой не существует
              </Typography>
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                variant="titleThirdEmphasized"
                marginBottom={1}
              >
                Почему это произошло?
              </Typography>
              <Typography component="p" variant="textBodyRegular">
                В большинстве ситуаций ошибка 404 отображается, если связь с
                сервером установлена, но информации по заданному запросу нет.
                Возможно, в адресе опечатка — такое случается при ручном наборе.
                Или страница была удалена, но сохранилась в закладках вашего
                браузера
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
              <Typography
                component="p"
                variant="textBodyRegular"
                marginBottom={1.5}
              >
                Поскольку мы не знаем, как и откуда вы попали на эту страницу,
                то рекомендуем вернуться на{" "}
                <Typography
                  component={Link}
                  to="/"
                  variant="textBodyRegular"
                  color="customColors.colorsBlue"
                  sx={{ textDecoration: "underline" }}
                >
                  главную страницу
                </Typography>
              </Typography>
              <Typography component="p" variant="textBodyRegular">
                А еще можно написать нам в{" "}
                <Typography
                  component="a"
                  href="mailto:support@roze.kz"
                  variant="textBodyRegular"
                  color="customColors.colorsBlue"
                  sx={{ textDecoration: "underline" }}
                >
                  службу поддержки
                </Typography>
                . Если проблема случилась по нашей вине <br /> — например, из-за
                неправильного редиректа на страницу с изменённым адресом <br />{" "}
                — мы всё поправим в кратчайшие сроки
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                height: 1,
                padding: "16px 0",
              }}
            >
              <Box
                component="img"
                src="/static/images/img-house-search.svg"
                alt="Page not found"
                width={1}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
