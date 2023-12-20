import React from "react";
import { Box, Typography } from "@mui/material";
import { TbCurrencyTenge } from "react-icons/tb";

import { usePriceNormalize } from "../../hooks/usePriceNormalize";

interface PriceBlockProps {
  price: number;
  discount: number;
  displayTag?: boolean;
  displayDiscount?: boolean;
}

export const PriceBlock = (props: PriceBlockProps) => {
  const { price, discount, displayDiscount, displayTag } = props;
  const { totalPrice } = usePriceNormalize(price, discount);

  return (
    <Box display="flex" alignItems="flex-start" flexDirection="column">
      <Typography
        component="h2"
        variant="titleSecondRegular"
        display="flex"
        alignItems="center"
      >
        {totalPrice} <TbCurrencyTenge size={20} />
        {displayDiscount && (
          <Typography
            variant="textFootnoteRegular"
            color="customColors.labelsSecondary"
            display="flex"
            alignItems="center"
            alignSelf="flex-end"
            marginBottom={0.25}
            marginLeft={0.25}
            sx={{ textDecoration: "line-through" }}
          >
            {price.toLocaleString("ru")} <TbCurrencyTenge size={12} />
          </Typography>
        )}
      </Typography>
      {displayTag && (
        <Box
          sx={{
            padding: "2px 4px",
            backgroundColor: "customColors.colorsGreen",
            color: "customColors.colorsWhite",
            borderRadius: 1,
            marginBottom: 0.5,
          }}
        >
          <Typography variant="textFootnoteRegular">снижение цены</Typography>
        </Box>
      )}
    </Box>
  );
};
