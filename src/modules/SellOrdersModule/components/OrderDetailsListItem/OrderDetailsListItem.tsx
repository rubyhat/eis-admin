import { Box, Typography } from "@mui/material";
import React from "react";
import { TbCurrencyTenge } from "react-icons/tb";

interface OrderDetailsListItemProps {
  label: string;
  value: string;
  showCurrency?: boolean;
  mapLink?: string | null;
}

export const OrderDetailsListItem = ({
  label,
  value,
  mapLink,
  showCurrency = false,
}: OrderDetailsListItemProps) => {
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
      <Typography
        component="p"
        variant="textBodyRegular"
        display="flex"
        alignItems="center"
      >
        {value} {showCurrency && <TbCurrencyTenge size={16} />}
      </Typography>
      {mapLink && (
        <Typography
          component="a"
          variant="textCalloutRegular"
          href={mapLink}
          target="_blank"
          rel="noreferrer"
          color="customColors.colorsOrange"
          sx={{
            textDecoration: "underline",
            "&:hover": {
              textDecoration: "none",
            },
          }}
        >
          Показать на карте
        </Typography>
      )}
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
