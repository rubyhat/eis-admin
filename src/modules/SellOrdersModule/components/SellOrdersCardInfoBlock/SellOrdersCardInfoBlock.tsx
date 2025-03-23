import React from "react";
import { Box, Typography } from "@mui/material";
import { ResponseSellOrderData } from "../../../../shared/interfaces";
import { estateObjectDictionary } from "../../../../shared/dictionaries/EstateObjectDictionary";
import { TbCurrencyTenge } from "react-icons/tb";
import { usePriceNormalize } from "../../../../hooks";

interface SellOrdersCardInfoBlockProps {
  order: ResponseSellOrderData;
}

export const SellOrdersCardInfoBlock = ({
  order,
}: SellOrdersCardInfoBlockProps) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", py: 1 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
          >
            Тип услуги
          </Typography>
          <Typography component="p" variant="textBodyRegular">
            {estateObjectDictionary.type[order.type]}
          </Typography>
        </Box>
        {order.roomCount && (
          <Box>
            <Typography
              component="p"
              variant="textBodyRegular"
              color="customColors.labelsSecondary"
            >
              Количество комнат
            </Typography>
            <Typography component="p" variant="textBodyRegular">
              {order.roomCount}
            </Typography>
          </Box>
        )}
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
          >
            ФИО клиента
          </Typography>
          <Typography component="p" variant="textBodyRegular">
            {order.ownerInfo.ownerName}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
          >
            Категория
          </Typography>
          <Typography component="p" variant="textBodyRegular">
            {estateObjectDictionary.category[order.category]}
          </Typography>
        </Box>
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
          >
            Площадь
          </Typography>
          <Typography component="p" variant="textBodyRegular">
            {order.houseSquare} м²
          </Typography>
        </Box>
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
          >
            Стоимость
          </Typography>
          <Typography
            component="p"
            variant="textBodyRegular"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {
              usePriceNormalize(order.price || 0, order.discount || 0)
                .totalPrice
            }
            <TbCurrencyTenge size={16} />{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
