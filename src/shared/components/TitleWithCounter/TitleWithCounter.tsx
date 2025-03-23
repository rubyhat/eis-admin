import { Badge, Typography } from "@mui/material";
import React from "react";

interface TitleWithCounterProps {
  text: string;
  count: string | number;
}

export const TitleWithCounter = ({ text, count }: TitleWithCounterProps) => {
  return (
    <Typography component="h1" variant="titleFirstRegular">
      {text}
      <Badge
        color="primary"
        badgeContent={count}
        sx={{ marginLeft: 2, marginBottom: 2 }}
      />
    </Typography>
  );
};
