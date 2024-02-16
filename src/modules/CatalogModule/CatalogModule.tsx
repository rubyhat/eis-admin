import { Box, Container, Grid, Typography, Alert } from "@mui/material";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { apiCatalogModule } from "./api/apiCatalogModule";
import { CatalogObjectives } from "./components/CatalogObjectives";
import { CatalogSortGroup } from "./components/CatalogSortGroup";
import { FilterMobileWrapper } from "../FilterModule/components/FilterMobileWrapper";
import { FilterModule } from "../FilterModule";
import useTitle from "../../hooks/useTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { useCatalogStore } from "./store";
import { CatalogCardSkeleton } from "./components/CatalogCardSkeleton";
import { CustomButton } from "../../components/CustomButton";

export const CatalogModule = () => {
  useTitle("Каталог");

  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const { estateObjects, setEstateObjects } = useCatalogStore((state) => state);

  const {
    data: catalogData,
    isLoading,
    isSuccess,
    isError,
  } = useQuery({
    queryFn: () => apiCatalogModule.fetchCatalog(searchParams.toString()),
    queryKey: ["catalogItems"],
  });

  React.useEffect(() => {
    if (isSuccess && !isError) {
      setEstateObjects(catalogData);
    }
  }, [catalogData, isError, isSuccess, setEstateObjects]);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Box
            width={1}
            display="flex"
            justifyContent="space-between"
            sx={{
              alignItems: {
                xs: "flex-start",
                sm: "flex-end",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Box width={1}>
              <Typography
                component="h2"
                variant="titleFirstRegular"
                marginBottom={2}
              >
                Список всех объектов
              </Typography>
              <CatalogSortGroup />
            </Box>
            <FilterMobileWrapper />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          {isSuccess && Boolean(!estateObjects.length) && (
            <Alert severity="info">
              В данный момент нет подходящих объектов недвижимости, проверьте
              правильно ли заданы фильтры и сортировка, а также точно ли
              существует такой объект недвижимости
            </Alert>
          )}
          {isLoading &&
            Array.from(new Array(9)).map((_, index) => (
              <CatalogCardSkeleton key={index} />
            ))}
          {isError && (
            <Alert severity="warning">
              Произошла ошибка во время запроса данных с сервера! В данный
              момент уже ведутся работы по улучшению платформы, скоро здесь
              появятся объекты недвижимости, пожалуйста, попробуйте зайти
              позднее!
            </Alert>
          )}
          {isSuccess && Boolean(estateObjects.length) && <CatalogObjectives />}
        </Grid>
        <Grid
          item
          md={4}
          lg={3}
          sx={{ display: { xs: "none", md: "inherit" } }}
        >
          <Box>
            <FilterModule />
          </Box>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: {
            xs: "inherit",
            md: "none",
          },
          position: "fixed",
          bottom: 16,
          left: 0,
          width: 1,
          padding: 2,
        }}
      >
        <CustomButton
          fullWidth
          size="large"
          onClick={() => navigate("/catalog/create")}
        >
          + Добавить объект
        </CustomButton>
      </Box>
    </Container>
  );
};
