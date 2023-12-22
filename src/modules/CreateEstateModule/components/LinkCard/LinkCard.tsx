import { Box, Typography } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";

export const LinkCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: 1,
        padding: 2,
        cursor: "pointer",
        transition: "all 333ms ease",
        "&:hover": {
          borderColor: "customColors.labelsSecondary",
        },
      }}
    >
      <Box>
        <Typography component="p" variant="textBodyRegular">
          Продать
        </Typography>
        <Typography
          component="p"
          variant="textCalloutRegular"
          color="customColors.labelsSecondary"
        >
          Продажа недвижимости
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography color="customColors.labelsSecondary">Дальше</Typography>
        <IoIosArrowForward size={24} color="#d4d4d4" />
      </Box>
    </Box>
  );
};
