import { Box, Typography } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import {
  CategoryType,
  ServiceType,
} from "../../../../shared/interfaces/EstateObjectTypes";

interface LinkCardProps {
  id: ServiceType | CategoryType;
  title: string;
  subtitle: string;
  selected: string;
  onClick?: () => void;
}

export const LinkCard = (props: LinkCardProps) => {
  const { id, title, subtitle, selected, onClick } = props;
  return (
    <Box
      onClick={onClick && onClick}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "2px solid",
        borderColor:
          selected === id
            ? "customColors.colorsOrange"
            : "customColors.labelsQuaternary",
        borderRadius: 1,
        padding: 2,
        cursor: "pointer",
        transition: "all 333ms ease",
        "&:hover": {
          borderColor: "hsla(29, 100%, 50%, .15)",
        },
      }}
    >
      <Box>
        <Typography component="p" variant="textBodyRegular">
          {title}
        </Typography>
        <Typography
          component="p"
          variant="textCalloutRegular"
          color="customColors.labelsSecondary"
        >
          {subtitle}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography color="customColors.labelsSecondary">Выбрать</Typography>
        <IoIosArrowForward size={24} color="#d4d4d4" />
      </Box>
    </Box>
  );
};
