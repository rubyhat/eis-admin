import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { HelpCardLink } from "../HelpCardList";

interface HelpCardProps {
  link: HelpCardLink;
}

export const HelpCard = ({ link }: HelpCardProps) => {
  return (
    <Box
      component={Link}
      to={link.disabled ? "" : link.to}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: 1,
        height: 270,
        border: "4px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: 10,
        cursor: link.disabled ? "no-drop" : "pointer",
        transition: "all 333ms ease",
        "&:hover": link.disabled
          ? {}
          : {
              borderColor: "customColors.labelsSecondary",
              color: "customColors.labelsSecondary",
            },
      }}
    >
      {link.icon}
      <Typography
        component="h6"
        variant="titleThirdRegular"
        color="customColors.labelsPrimary"
        marginTop={1}
      >
        {link.title}
      </Typography>
    </Box>
  );
};
