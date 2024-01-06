import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

interface Link {
  title: string;
  to: string;
  disabled: boolean;
}

const links: Link[] = [
  {
    title: "Объекты",
    to: "/help/estate",
    disabled: false,
  },
  {
    title: "Заявки",
    to: "/help/orders",
    disabled: true,
  },
  {
    title: "Сотрудники",
    to: "/help/workers",
    disabled: true,
  },
  {
    title: "Обучение",
    to: "/help/school",
    disabled: true,
  },
];

export const HelpCardList = () => {
  return (
    <>
      {links.map((link, index) => (
        <Grid key={index} item xs={12} md={3}>
          <Box
            component={Link}
            to={link.to}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
            <Typography
              component="h6"
              color="customColors.labelsSecondary"
              variant="titleSecondRegular"
            >
              {link.title}
            </Typography>
          </Box>
        </Grid>
      ))}
    </>
  );
};
