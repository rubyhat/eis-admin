import { Grid } from "@mui/material";
import React from "react";
import { HelpCard } from "../HelpCard/HelpCard";
import { IoDocumentTextOutline, IoHomeOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { BsBook } from "react-icons/bs";

export interface HelpCardLink {
  icon: React.ReactNode;
  title: string;
  to: string;
  disabled: boolean;
}

const links: HelpCardLink[] = [
  {
    icon: <IoHomeOutline size={128} color="#FF9500" />,
    title: "Объекты",
    to: "/help/estate",
    disabled: false,
  },
  {
    icon: <IoDocumentTextOutline size={128} color="#DCDCDD" />,
    title: "Заявки",
    to: "/help/orders",
    disabled: true,
  },
  {
    icon: <AiOutlineUser size={128} color="#DCDCDD" />,
    title: "Сотрудники",
    to: "/help/workers",
    disabled: true,
  },
  {
    icon: <BsBook size={128} color="#DCDCDD" />,
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
