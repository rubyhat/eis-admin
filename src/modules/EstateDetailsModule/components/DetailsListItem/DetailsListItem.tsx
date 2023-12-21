import { Box, Typography } from "@mui/material";
import React from "react";

interface DetailsListItemProps {
  label: string;
  title?: string;
  link?: string;
  videoLink?: string;
}

export const DetailsListItem = (props: DetailsListItemProps) => {
  const { label, title, link, videoLink } = props;
  return (
    <Box
      component="li"
      sx={{
        padding: "8px 0",
        borderBottom: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        "&:last-child": {
          border: "none",
        },
      }}
    >
      <Typography component="p" variant="textBodyRegular">
        {title && title}
        {link && (
          <Typography
            component="a"
            variant="textCalloutRegular"
            href={link}
            target="_blank"
            rel="noreferrer"
            color="customColors.colorsBlue"
            sx={{
              textDecoration: "underline",
              marginLeft: 2,
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            Показать на карте
          </Typography>
        )}
        {videoLink && (
          <Typography
            component="a"
            href={videoLink}
            target="_blank"
            rel="noreferrer"
            color="customColors.colorsBlue"
            sx={{
              textDecoration: "underline",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            Открыть видео обзор в Instagram
          </Typography>
        )}
      </Typography>
      <Typography
        component="p"
        variant="textSubheadlineRegular"
        color="customColors.labelsSecondary"
      >
        {label}
      </Typography>
    </Box>
  );
};
