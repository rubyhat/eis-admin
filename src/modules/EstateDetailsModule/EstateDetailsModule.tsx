import React from "react";
import useTitle from "../../hooks/useTitle";
import { Alert, Box, Container, Grid, Typography } from "@mui/material";
import { AgentCard } from "../../components/AgentCard/AgentCard";
import { DetailsList } from "./components/DetailsList/DetailsList";
import { ImageViewer } from "./components/ImageViewer/ImageViewer";
import { SettingsButtonBar } from "./components/SettingsButtonBar";
import { CustomHr } from "../../components/CustomHr";
import { TitleGroup } from "./components/TitleGroup";
import { useLocation, useParams } from "react-router";
import { apiEstateDetailsModule } from "./api/apiEstateDetailsModule";
import { useQuery } from "@tanstack/react-query";
import { DisplayEstateObject } from "../../shared/interfaces/EstateObjectTypes";

export const EstateDetailsModule = () => {
  useTitle("Детали объекта недвижимости");
  const location = useLocation();
  const { id } = useParams();
  const [estateDetails, setEstateDetails] =
    React.useState<DisplayEstateObject | null>(null);

  const {
    data: estateDetailsData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryFn: () =>
      id
        ? apiEstateDetailsModule.getDetailsById(id)
        : Promise.reject("No ID provided"),
    queryKey: ["estateDetails", id],
    enabled: !location.state?.estateDetails,
  });

  React.useEffect(() => {
    if (location.state?.estateDetails)
      setEstateDetails(location.state.estateDetails);

    if (isSuccess) setEstateDetails(estateDetailsData);
  }, [estateDetailsData, isSuccess, location.state]);

  if (isLoading) {
    return <Box>Загрузка...</Box>;
  }

  if (isError) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Alert severity="error">
              Произошла ошибка при получении данных с сервера! Проверьте адрес
              или обратитесь в тех. поддержку
            </Alert>
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (estateDetails) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TitleGroup estateDetails={estateDetails} />
          </Grid>
          <Grid item xs={12} md={5} lg={6}>
            <SettingsButtonBar />
            <CustomHr />
            <AgentCard />
            <Box padding="16px 0">
              <DetailsList estateDetails={estateDetails} />
            </Box>
            <Box>
              <Typography
                variant="textBodyRegular"
                dangerouslySetInnerHTML={{
                  __html: estateDetails.description,
                }} // add styles for data
              ></Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={7} lg={6}>
            <ImageViewer />
          </Grid>
        </Grid>
      </Container>
    );
  }
};
