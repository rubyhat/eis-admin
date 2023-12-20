import React from "react";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

export const Logotype = () => {
  return (
    <Typography
      component={Link}
      to="/"
      variant="textCalloutRegular"
      color="customColors.labelsPrimary"
      display="flex"
      alignItems="center"
    >
      Roze
      <Typography color="customColors.colorsBlue" marginLeft={0.5}>
        Agency
      </Typography>
    </Typography>
  );
};
