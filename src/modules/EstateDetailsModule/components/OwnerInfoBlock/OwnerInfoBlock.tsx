import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { FiShare } from "react-icons/fi";

import { CustomButton } from "../../../../components/CustomButton";
import { DisplayEstateObject } from "../../../../shared/interfaces/EstateObjectTypes";
import { useCopySharingLink } from "../../../../hooks/useCopySharingLink";
import { useScreenSize } from "../../../../hooks/useScreenSize";
import { CustomHr } from "../../../../components/CustomHr";

interface OwnerInfoBlockProps {
  estateDetails: DisplayEstateObject;
}

// todo: need refactoring
export const OwnerInfoBlock = ({ estateDetails }: OwnerInfoBlockProps) => {
  const { apartmentComplex, ownerInfo, targetFloor, tiktokLink } =
    estateDetails;
  const { isMobileDevice } = useScreenSize();
  const { deviceShareLink, copyLink } = useCopySharingLink();
  const msgText = `Информация о собственнике недвижимости:\nИмя: ${
    estateDetails.ownerInfo.ownerName
  }\nТелефон: ${estateDetails.ownerInfo.ownerPhone}\nЗаметка: \n${
    estateDetails.ownerInfo.description
  }\n${isMobileDevice ? "" : `\nСсылка на объект: ${window.location.href}`}`;

  const handleSharePage = () => {
    if (isMobileDevice) {
      deviceShareLink({
        title: "Roze Agency",
        text: msgText,
        url: window.location.href,
      });
    } else {
      copyLink(msgText);
    }
  };

  return (
    <Box
      sx={{
        border: "1px solid",
        borderRadius: 1,
        borderColor: "customColors.labelsQuaternary",
        padding: 2,
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems=" center">
        <Box>
          <Typography component="p" variant="textBodyEmphasized">
            Имя собственника:
          </Typography>
          <Typography component="p" variant="textBodyRegular" marginBottom={1}>
            {estateDetails.ownerInfo.ownerName}
          </Typography>
        </Box>
        <IconButton
          onClick={handleSharePage}
          color="primary"
          sx={{
            border: "1px solid",
            borderRadius: "50%",
            borderColor: "hsla(211, 100%, 50%, .25)",
          }}
        >
          <FiShare size={20} />
        </IconButton>
      </Box>

      <Typography component="p" variant="textBodyEmphasized">
        Телефон собственника:
      </Typography>
      <Typography
        component="a"
        href={`tel:${ownerInfo.ownerPhone}`}
        sx={{
          display: "inline-block",
          color: "customColors.colorsOrange",
          textDecoration: "underline",
          padding: 0.25,
        }}
      >
        {ownerInfo.ownerPhone}
      </Typography>
      <CustomHr />
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {ownerInfo.entranceNumber && (
          <Box>
            <Typography component="p" variant="textBodyEmphasized">
              Подъезд:
            </Typography>
            <Typography
              component="p"
              variant="textBodyRegular"
              marginBottom={1}
            >
              {estateDetails.ownerInfo.entranceNumber}
            </Typography>
          </Box>
        )}
        {ownerInfo.intercomNumber && (
          <Box>
            <Typography component="p" variant="textBodyEmphasized">
              Домофон:
            </Typography>
            <Typography
              component="p"
              variant="textBodyRegular"
              marginBottom={1}
            >
              {ownerInfo.intercomNumber}
            </Typography>
          </Box>
        )}

        {targetFloor !== null && targetFloor !== undefined && (
          <Box>
            <Typography component="p" variant="textBodyEmphasized">
              Этаж:
            </Typography>
            <Typography component="p" variant="textBodyRegular">
              {targetFloor > 0 ? estateDetails.targetFloor : "Не указан"}
            </Typography>
          </Box>
        )}
        {ownerInfo.apartmentNumber && (
          <Box>
            <Typography component="p" variant="textBodyEmphasized">
              Квартира:
            </Typography>
            <Typography component="p" variant="textBodyRegular">
              {ownerInfo.apartmentNumber}
            </Typography>
          </Box>
        )}
      </Box>
      <CustomHr margin="8px 0" />
      {ownerInfo.description && (
        <>
          <Typography component="p" variant="textBodyEmphasized">
            Заметка:
          </Typography>
          <Typography component="p" variant="textBodyRegular" marginBottom={1}>
            {ownerInfo.description}
          </Typography>
        </>
      )}

      {tiktokLink && (
        <>
          <Typography component="p" variant="textBodyEmphasized">
            Ссылка на ТикТок:
          </Typography>
          <Typography component="p" variant="textBodyRegular" marginBottom={1}>
            <Typography
              sx={{
                display: "inline-block",
                color: "customColors.colorsOrange",
                textDecoration: "underline",
                padding: 0.25,
              }}
              component="a"
              href={tiktokLink}
              target="_blank"
            >
              {tiktokLink}
            </Typography>
          </Typography>
        </>
      )}
      {ownerInfo.ownerComment && (
        <>
          <Typography
            component="p"
            variant="textBodyEmphasized"
            marginBottom={1}
          >
            Комментарий от собственника
          </Typography>
          <Typography component="p" variant="textBodyRegular" marginBottom={1}>
            {ownerInfo.ownerComment}
          </Typography>
        </>
      )}
      {apartmentComplex && apartmentComplex.title && (
        <>
          {ownerInfo.ownerComment && <CustomHr />}
          <Typography
            component="p"
            variant="textBodyEmphasized"
            marginBottom={1}
          >
            Жилой комплекс
          </Typography>
          <Typography component="p" variant="textBodyEmphasized">
            Название:
          </Typography>
          <Typography component="p" variant="textBodyRegular" marginBottom={1}>
            {apartmentComplex.title}
          </Typography>
        </>
      )}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        {ownerInfo.ownerPhone ? (
          <Box component="a" href={`tel:${ownerInfo.ownerPhone}`}>
            <CustomButton size="medium" fullWidth>
              Позвонить
            </CustomButton>
          </Box>
        ) : (
          <CustomButton size="medium" fullWidth disabled>
            Позвонить
          </CustomButton>
        )}
        {ownerInfo.ownerPhone ? (
          <Box
            component="a"
            href={`https://api.whatsapp.com/send?phone=${ownerInfo.ownerPhone.slice(
              1,
            )}&text=Здравствуйте, меня интересует недвижимость на Вашем сайте.`}
            target="_blank"
            rel="noreferrer"
          >
            <CustomButton
              fullWidth
              size="medium"
              isGreenButton
              disabled={!ownerInfo.ownerPhone}
            >
              Написать
            </CustomButton>
          </Box>
        ) : (
          <CustomButton fullWidth size="medium" isGreenButton disabled>
            Написать
          </CustomButton>
        )}
      </Box>
    </Box>
  );
};
