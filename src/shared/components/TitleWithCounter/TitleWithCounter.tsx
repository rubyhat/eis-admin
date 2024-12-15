import { Badge, Typography } from "@mui/material";
import React from "react";

interface TitleWithCounterProps {
  count: string | number;
}

export const TitleWithCounter = ({ count }: TitleWithCounterProps) => {
  return (
    <Typography component="h1" variant="titleFirstRegular">
      Заявки на покупку
      <Badge
        color="primary"
        badgeContent={count}
        sx={{ marginLeft: 2, marginBottom: 2 }}
      />
    </Typography>
  );
};
