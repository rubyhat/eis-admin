import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

import { SellOrderDisplay } from "../../store/interfaces";
import { useFormatEstateTitle } from "../../../../shared/hooks/useFormatEstateTitle";
import { OrderDetailsList } from "../OrderDetailsList";
import { CustomButton } from "../../../../components/CustomButton";
import { useNavigate } from "react-router-dom";

interface OrderListItemProps {
  order: SellOrderDisplay;
}

export const OrderListItem = ({ order }: OrderListItemProps) => {
  const { _id, category, roomCount, houseSquare, geoPosition } = order;

  const navigate = useNavigate();
  const { title } = useFormatEstateTitle({
    category,
    roomCount,
    houseSquare,
  });

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<IoIosArrowDown />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsPrimary"
          >
            {geoPosition.street}, {geoPosition.houseNumber}
          </Typography>
          <Typography
            component="p"
            variant="textSubheadlineRegular"
            color="customColors.labelsSecondary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <OrderDetailsList order={order} />
        <CustomButton
          fullWidth
          size="large"
          onClick={() => navigate("/orders/sell/" + _id)}
        >
          Открыть заявку
        </CustomButton>
      </AccordionDetails>
    </Accordion>
  );
};
