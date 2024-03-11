import React from "react";
import { OrdersCard } from "../OrderCardList";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface OrderCardProps {
  card: OrdersCard;
}

export const OrderCard = ({ card }: OrderCardProps) => {
  return (
    <Box
      component={Link}
      to={card.disabled ? "" : card.link}
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
        cursor: card.disabled ? "no-drop" : "pointer",
        transition: "all 333ms ease",
        "&:hover": card.disabled
          ? {}
          : {
              borderColor: "customColors.labelsSecondary",
              color: "customColors.labelsSecondary",
            },
      }}
    >
      {card.icon}
      <Typography
        component="h6"
        variant="titleThirdRegular"
        color="customColors.colorsBlue"
        marginTop={1}
      >
        {card.title}
      </Typography>
    </Box>
  );
};
