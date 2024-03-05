import React from "react";
import useTitle from "../../hooks/useTitle";
import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { AgentCard } from "../../components/AgentCard/AgentCard";
import { DetailsList } from "./components/DetailsList/DetailsList";
import { ImageViewer } from "./components/ImageViewer/ImageViewer";
import { SettingsButtonBar } from "./components/SettingsButtonBar";
import { TitleGroup } from "./components/TitleGroup";
import { useLocation, useParams } from "react-router";
import { apiEstateDetailsModule } from "./api/apiEstateDetailsModule";
import { useQuery } from "@tanstack/react-query";
import { useEstateDetailsStore } from "./store";
import { ButtonStickyBottom } from "../../components/ButtonStickyBottom";
import { useNavigate } from "react-router-dom";
import { useScreenSize } from "../../hooks/useScreenSize";
import { useFormatDate } from "../../shared/hooks/useFormatDate";
import { useUserStore } from "../UserModule/store/useUserStore";
import { CustomButton } from "../../components/CustomButton";

export const EstateDetailsModule = () => {
  useTitle("Детали объекта недвижимости");
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isMobile } = useScreenSize();
  const { isAdmin, user: currentUser } = useUserStore();
  const { estateDetails, setEstateDetails, setActiveImage } =
    useEstateDetailsStore((state) => state);
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
            <SettingsButtonBar
              key={estateDetails._id}
              _id={estateDetails._id}
              currentStatus={estateDetails.visibilityStatus}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                border: "1px solid",
                borderRadius: 1,
                borderColor: "customColors.labelsQuaternary",
                padding: 1,
              }}
            >
              <Typography component="p" variant="textBodyEmphasized">
                Имя собственника:
              </Typography>
              <Typography
                component="p"
                variant="textBodyRegular"
                marginBottom={1}
              >
                {estateDetails.ownerInfo.ownerName}
              </Typography>
              <Typography component="p" variant="textBodyEmphasized">
                Телефон собственника:
              </Typography>
              <Typography
                component="a"
                href={`tel:${estateDetails.ownerInfo.ownerPhone}`}
                sx={{
                  display: "inline-block",
                  color: "customColors.colorsBlue",
                  textDecoration: "underline",
                  padding: 0.25,
                  marginBottom: 1,
                }}
              >
                {estateDetails.ownerInfo.ownerPhone}
              </Typography>
              <Typography component="p" variant="textBodyEmphasized">
                Заметка:
              </Typography>
              <Typography
                component="p"
                variant="textBodyRegular"
                marginBottom={1}
              >
                {estateDetails.ownerInfo.description}
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                <Box
                  component="a"
                  href={`tel:${estateDetails.ownerInfo.ownerPhone}`}
                >
                  <CustomButton size="medium" fullWidth>
                    Позвонить
                  </CustomButton>
                </Box>
                <Box
                  component="a"
                  href={`https://api.whatsapp.com/send?phone=${estateDetails.ownerInfo.ownerPhone.slice(
                    1,
                  )}&text=Здравствуйте, меня интересует недвижимость на Вашем сайте.`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <CustomButton fullWidth size="medium" isGreenButton>
                    {isMobile ? "Написать" : "Написать в WhatsApp"}
                  </CustomButton>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TitleGroup estateDetails={estateDetails} />
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
              marginTop={2}
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
