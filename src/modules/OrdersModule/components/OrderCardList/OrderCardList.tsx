import React from "react";
import { Grid } from "@mui/material";

import { IoSearch } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineDollar } from "react-icons/ai";

import { OrderCard } from "../OrderCard";

export interface OrdersCard {
  icon: React.ReactNode;
  link: string;
  title: string;
  disabled: boolean;
}

const iconColor = "hsla(32, 100%, 55%, 1)";
const list: OrdersCard[] = [
  {
    icon: <IoHomeOutline size={128} color={iconColor} />,
    link: "/orders/feedback",
    disabled: false,
    title: "Заявки на покупку",
  },
  {
    icon: <AiOutlineDollar size={128} color="#DCDCDD" />,
    link: "/orders/sell",
    disabled: true,
    title: "Заявки на продажу",
  },
  {
    icon: <IoSearch size={128} color="#DCDCDD" />,
    link: "/orders/buy",
    disabled: true,
    title: "Заявки на поиск",
  },
];

export const OrderCardList = () => {
  return (
    <>
      {list.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <OrderCard key={index} card={card} />
        </Grid>
      ))}
    </>
  );
};
