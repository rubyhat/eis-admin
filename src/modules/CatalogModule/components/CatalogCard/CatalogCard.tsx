import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

export const CatalogCard = () => {
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
        component={Link}
        to="/catalog/123"
      >
        <Box>
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsPrimary"
          >
            Проспект Нуркена Абдирова, 124/3а
          </Typography>
          <Typography
            component="p"
            variant="textSubheadlineRegular"
            color="customColors.labelsSecondary"
          >
            2-х комнатная | 45м2 | Т 16.000.000
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" marginLeft={1}>
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
