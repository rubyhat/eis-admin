import { Box, Container, Grid, Typography } from "@mui/material";
import useTitle from "../../../hooks/useTitle";

export const AccessDenied = () => {
  useTitle("Roze Agency - Доступ запрещен");
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
              Доступ запрещен (401)
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
                Вы попали на страницу, для просмотра которой у Вас нет прав
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
                В большинстве ситуаций ошибка 401 отображается, если вы открыли
                страницу, к которой у Вас нет прав
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
                Попробуйте обновить страницу, проверить свою учетную запись и
                доступ в интернет. Если осталось все также, то обратитесь к
                руководителю или администратору
              </Typography>
              <Typography component="p" variant="textBodyRegular">
                А еще можно написать нам в{" "}
                <Typography
                  component="a"
                  href="mailto:support@roze.kz"
                  variant="textBodyRegular"
                  color="customColors.colorsOrange"
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
