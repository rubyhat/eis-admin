import React from "react";
import { OwnerInfo } from "../../../../shared/interfaces/EstateObjectTypes";
import { Box, IconButton, Typography } from "@mui/material";
import {
  basicCardStyles,
  iconButtonStyles,
  phoneLinkStyles,
  titleWrapperStyles,
} from "./styles";
import { useScreenSize } from "../../../../hooks/useScreenSize";
import { useCopySharingLink } from "../../../../hooks/useCopySharingLink";
import { FiShare } from "react-icons/fi";

interface SellDetailsOwnerInfoBlockParams {
  ownerInfo: OwnerInfo;
}

export const SellDetailsOwnerInfoBlock = ({
  ownerInfo,
}: SellDetailsOwnerInfoBlockParams) => {
  const { isMobileDevice } = useScreenSize();
  const { deviceShareLink, copyLink } = useCopySharingLink();
  const msgText = `Заявка на продажу/аренду.\n\nИнформация о собственнике недвижимости:\nИмя: ${
    ownerInfo.ownerName
  }\nТелефон: ${ownerInfo.ownerPhone}\nЗаметка: \n${
    ownerInfo.description || "Заметки нет"
  }\n${isMobileDevice ? "" : `\nСсылка на заявку: ${window.location.href}`}`;

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
    <Box sx={basicCardStyles}>
      <Box sx={titleWrapperStyles}>
        <Typography component="h6" variant="titleThirdEmphasized">
          Данные о собственнике
        </Typography>
        <IconButton
          onClick={handleSharePage}
          color="primary"
          sx={iconButtonStyles}
        >
          <FiShare size={20} />
        </IconButton>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography component="p" variant="textBodyRegular">
          Имя:
        </Typography>
        <Typography component="p" variant="textBodyRegular">
          {ownerInfo.ownerName}
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography component="p" variant="textBodyRegular">
          Сотовый телефон:
        </Typography>
        <Typography
          component="a"
          href={`tel:${ownerInfo.ownerPhone}`}
          sx={phoneLinkStyles}
        >
          {ownerInfo.ownerPhone}
        </Typography>
      </Box>
    </Box>
  );
};
