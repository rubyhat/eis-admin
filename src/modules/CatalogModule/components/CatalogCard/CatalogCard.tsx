import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { TbCurrencyTenge } from "react-icons/tb";

import { usePriceNormalize } from "../../../../hooks/usePriceNormalize";
import { estateObjectDictionary } from "../../../../shared/dictionaries/EstateObjectDictionary";
import { DisplayEstateObject } from "../../../../shared/interfaces/EstateObjectTypes";

interface CatalogCardProps {
  item: DisplayEstateObject;
}

export const CatalogCard = ({ item }: CatalogCardProps) => {
  return (
    <Box
      component="li"
      sx={{
        borderBottom: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: "8px 8px 0 0",
        "&:last-child": {
          border: "none",
          borderRadius: "0 0 8px 8px",
        },
        "&:hover": {
          backgroundColor: "#f8f8f8",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 2,
        }}
        component="div" // todo: ссылка внутри ссылки, нужно убрать и сделать кнопки
        // to={{ pathname: `/catalog/${item._id}` }}
        // state={{ estateDetails: item }}
      >
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsPrimary"
          >
            {item.geoPosition.street}, {item.geoPosition.houseNumber}
          </Typography>
          <Typography
            component="p"
            variant="textSubheadlineRegular"
            color="customColors.labelsSecondary"
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            {estateObjectDictionary.category[item.category]} | Комнат:{" "}
            {item.roomCount} | Площадь: {item.houseSquare} м² |{" "}
            <TbCurrencyTenge size={16} />{" "}
            {usePriceNormalize(item.price || 0, item.discount || 0).totalPrice}
          </Typography>
          <Typography
            component="p"
            variant="textSubheadlineRegular"
            color="customColors.labelsSecondary"
            sx={{ display: { xs: "flex", md: "none" }, alignItems: "center" }}
          >
            {estateObjectDictionary.category[item.category]} | Комнат:{" "}
            {item.roomCount} | Площадь: {item.houseSquare} м²
          </Typography>
        </Box>
        <Box
          component={Link}
          to={{ pathname: `/catalog/${item._id}` }}
          state={{ estateDetails: item }}
          display="flex"
          alignItems="center"
          marginLeft={1}
          padding="8px 0 8px"
        >
          <Typography
            component="p"
            variant="textSubheadlineRegular"
            color="customColors.labelsSecondary"
            sx={{
              marginBottom: 0.25,
              display: {
                xs: "none",
                sm: "inherit",
              },
            }}
          >
            Детали
          </Typography>
          <IoIosArrowForward size={24} color="#d4d4d4" />
        </Box>
      </Box>
    </Box>
  );
};
