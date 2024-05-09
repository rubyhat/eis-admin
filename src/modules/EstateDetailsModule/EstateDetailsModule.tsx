import React from "react";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router";

import useTitle from "../../hooks/useTitle";
import { AgentCard } from "../../components/AgentCard/AgentCard";
import { DetailsList } from "./components/DetailsList/DetailsList";
import { ImageViewer } from "./components/ImageViewer/ImageViewer";
import { SettingsButtonBar } from "./components/SettingsButtonBar";
import { TitleGroup } from "./components/TitleGroup";
import { apiEstateDetailsModule } from "./api/apiEstateDetailsModule";
import { useEstateDetailsStore } from "./store";
import { ButtonStickyBottom } from "../../components/ButtonStickyBottom";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useFormatDate } from "../../shared/hooks/useFormatDate";
import { useUserStore } from "../UserModule/store/useUserStore";
import { OwnerInfoBlock } from "./components/OwnerInfoBlock";
import { EstateIdTag } from "./components/EstateIdTag";

export const EstateDetailsModule = () => {
  useTitle("Детали объекта недвижимости");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isMobile } = useScreenSize();
  const { isAdmin, user: currentUser } = useUserStore();
  const {
    estateDetails,
    setEstateDetails,
    setActiveImage,
    setCurrentVisibilityStatus,
  } = useEstateDetailsStore((state) => state);
  const { dayAndMonth, time } = useFormatDate(
    estateDetails ? estateDetails.updatedAt : "",
  );

  const {
    data: estateDetailsData,
    isLoading,
    isError,
    isSuccess,
    error,
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
    if (estateDetails)
      setCurrentVisibilityStatus(estateDetails.visibilityStatus);
  }, [estateDetails, setCurrentVisibilityStatus]);

  React.useEffect(() => {
    const images = estateDetails?.images;
    const activeImage = images && images.length > 0 ? images[0].imageUrl : null;
    const activeImageId = images && images.length > 0 ? images[0]._id : null;
    setActiveImage(activeImage, activeImageId);
  }, [estateDetails?.images, setActiveImage]);

  if (isLoading) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Alert severity="error">
              {error.message.includes("404")
                ? "Данный объект не найден. Возможно он был удален! Проверьте ссылку или обратитесь в тех. поддержку."
                : "Произошла ошибка при получении данных с сервера! Проверьте ссылку или обратитесь в тех. поддержку."}
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
            <SettingsButtonBar key={uuidv4()} _id={estateDetails._id} />
          </Grid>
          {estateDetails.ownerInfo && (
            <Grid item xs={12} md={6}>
              <OwnerInfoBlock estateDetails={estateDetails} />
            </Grid>
          )}
          <Grid item xs={12}>
            <TitleGroup estateDetails={estateDetails} />
            {id && <EstateIdTag id={id} />}
          </Grid>
          {isMobile && (
            <Grid item xs={12}>
              <ImageViewer />
            </Grid>
          )}
          <Grid item xs={12} md={5} lg={6}>
            {estateDetails.estateAgent && (
              <AgentCard estateAgent={estateDetails.estateAgent} />
            )}
            <Box padding="16px 0">
              <DetailsList estateDetails={estateDetails} />
            </Box>
            <Box
              className="description-text-block"
              dangerouslySetInnerHTML={{
                __html: estateDetails.description,
              }}
            ></Box>
            <Typography
              component="p"
              variant="textFootnoteRegular"
              color="customColors.labelsSecondary"
              textAlign="right"
            >
              Обновлено: {dayAndMonth} в {time}
            </Typography>
          </Grid>
          {!isMobile && (
            <Grid item md={7} lg={6}>
              <ImageViewer />
            </Grid>
          )}
        </Grid>
        {(isAdmin || currentUser?._id === estateDetails.estateAgent?._id) && (
          <ButtonStickyBottom
            onClick={() =>
              navigate("/estate/edit", { state: { estateDetails } })
            }
          >
            Редактировать объект
          </ButtonStickyBottom>
        )}
      </Container>
    );
  }
};
