import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { FiShare } from "react-icons/fi";
import { CustomButton } from "../../../../components/CustomButton";
import { DisplayEstateObject } from "../../../../shared/interfaces/EstateObjectTypes";
import { useCopySharingLink } from "../../../../hooks/useCopySharingLink";
import { useScreenSize } from "../../../../hooks/useScreenSize";

interface OwnerInfoBlockProps {
  estateDetails: DisplayEstateObject;
}

export const OwnerInfoBlock = ({ estateDetails }: OwnerInfoBlockProps) => {
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
        padding: 1,
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
        href={`tel:${estateDetails.ownerInfo.ownerPhone}`}
        sx={{
          display: "inline-block",
          color: "customColors.colorsOrange",
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
      <Typography component="p" variant="textBodyRegular" marginBottom={1}>
        {estateDetails.ownerInfo.description}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 2,
        }}
      >
        <Box component="a" href={`tel:${estateDetails.ownerInfo.ownerPhone}`}>
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
            Написать
          </CustomButton>
        </Box>
      </Box>
    </Box>
  );
};
