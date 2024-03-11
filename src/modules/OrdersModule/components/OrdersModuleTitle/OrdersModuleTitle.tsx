import React from "react";
import { Grid, Typography } from "@mui/material";

export const OrdersModuleTitle = () => {
  return (
    <Grid item xs={12}>
      <Typography component="h1" variant="titleFirstRegular">
        Заявки
      </Typography>
      <Typography
        component="p"
        variant="textCalloutRegular"
        color="customColors.labelsSecondary"
        marginTop={0.5}
      >
        Выберите необходимую категорию заявок из списка ниже
      </Typography>
    </Grid>
  );
};
