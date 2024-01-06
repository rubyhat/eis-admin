import { Grid } from "@mui/material";
import React from "react";
import { HelpCard } from "../HelpCard/HelpCard";

export interface HelpCardLink {
  title: string;
  to: string;
  disabled: boolean;
}

const links: HelpCardLink[] = [
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
        <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <HelpCard link={link} />
        </Grid>
      ))}
    </>
  );
};
