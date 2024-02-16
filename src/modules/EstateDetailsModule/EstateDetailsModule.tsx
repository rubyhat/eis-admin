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
import { useEstateDetailsStore } from "./store";
import { ButtonStickyBottom } from "../../components/ButtonStickyBottom";
import { useNavigate } from "react-router-dom";

export const EstateDetailsModule = () => {
  useTitle("Детали объекта недвижимости");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { estateDetails, setEstateDetails, setActiveImage } =
    useEstateDetailsStore((state) => state);

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
  }, [estateDetailsData, isSuccess, location.state, setEstateDetails]);

  React.useEffect(() => {
    const images = estateDetails?.images;
    const activeImage = images && images.length > 0 ? images[0].imageUrl : null;
    const activeImageId = images && images.length > 0 ? images[0]._id : null;
    setActiveImage(activeImage, activeImageId);
  }, [estateDetails?.images, setActiveImage]);

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
            <SettingsButtonBar _id={estateDetails._id} />
          </Grid>
          <Grid item xs={12} md={5} lg={6}>
            <TitleGroup estateDetails={estateDetails} />
            <CustomHr />
            {estateDetails.estateAgent && (
              <AgentCard estateAgent={estateDetails.estateAgent} />
            )}
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
        <ButtonStickyBottom
          onClick={() => navigate("/estate/edit", { state: { estateDetails } })}
        >
          Редактировать объект
        </ButtonStickyBottom>
      </Container>
    );
  }
};
