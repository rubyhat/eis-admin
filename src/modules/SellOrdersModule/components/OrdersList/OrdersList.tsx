import React from "react";
import { useFetchSellOrders } from "../../hooks/useFetchSellOrders";
import { OrderListItem } from "../OrderListItem/OrderListItem";

export const OrdersList = () => {
  const { data } = useFetchSellOrders();
  return (
    <>{data?.map((item) => <OrderListItem order={item} key={item._id} />)}</>
  );
};
