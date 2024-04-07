import React from "react";
import { Box, Container, Grid, Typography, Alert, Badge } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import { apiCatalogModule } from "./api/apiCatalogModule";
import { CatalogObjectives } from "./components/CatalogObjectives";
import { FilterMobileWrapper } from "../FilterModule/components/FilterMobileWrapper";
import { FilterModule } from "../FilterModule";
import useTitle from "../../hooks/useTitle";
import { useLocation, useNavigate } from "react-router-dom";
import { useCatalogStore } from "./store";
import { CatalogCardSkeleton } from "./components/CatalogCardSkeleton";
import { ButtonStickyBottom } from "../../components/ButtonStickyBottom";

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
            <Box sx={{ width: 1, display: "flex", alignItems: "ceter" }}>
              <Typography
                component="h2"
                variant="titleFirstRegular"
                marginBottom={0}
              >
                Список всех объектов
              </Typography>
              <Badge
                badgeContent={catalogData?.length || 0}
                color="primary"
                sx={{ marginLeft: 2, marginTop: 1 }}
              />
              {/* todo: refactor sort buttons */}
              {/* <CatalogSortGroup /> */}
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
      <ButtonStickyBottom onClick={() => navigate("/estate/create")}>
        + Добавить объект
      </ButtonStickyBottom>
    </Container>
  );
};
