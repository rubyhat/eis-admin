import React from "react";
import { Box } from "@mui/material";

import { SellOrderDisplay } from "../../store/interfaces";
import { OrderDetailsListItem } from "../OrderDetailsListItem";
import { estateObjectDictionary } from "../../../../shared/dictionaries/EstateObjectDictionary";
import { usePriceNormalize } from "../../../../hooks/usePriceNormalize";

interface OrderDetailsListProps {
  order: SellOrderDisplay;
}

export const OrderDetailsList = ({ order }: OrderDetailsListProps) => {
  const { category, type, geoPosition, houseCondition, documents, price } =
    order;
  const normalizedPrice = usePriceNormalize(price, 0);
  const addressTitle =
    geoPosition.city +
    ", " +
    geoPosition.street +
    ", " +
    geoPosition.houseNumber;
  const mapSearchLink =
    geoPosition.city === "other"
      ? null
      : "https://2gis.kz/karaganda/search/" +
        geoPosition.street +
        "%20" +
        geoPosition.houseNumber;

  return (
    <Box component="ul">
      <OrderDetailsListItem
        label="Тип услуги"
        value={estateObjectDictionary.type[type]}
      />
      <OrderDetailsListItem
        label="Стоимость"
        value={normalizedPrice.totalPrice}
        showCurrency
      />
      <OrderDetailsListItem
        label="Категория"
        value={estateObjectDictionary.category[category]}
      />
      <OrderDetailsListItem
        label="Адрес"
        value={addressTitle}
        mapLink={mapSearchLink}
      />
      <OrderDetailsListItem
        label="Состояние"
        value={estateObjectDictionary.houseCondition[houseCondition]}
      />
      <OrderDetailsListItem
        label="Документы"
        value={estateObjectDictionary.documents[documents]}
      />
    </Box>
  );
};
