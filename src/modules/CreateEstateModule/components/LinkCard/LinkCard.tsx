import { Box, Typography } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { CategoryType, ServiceType } from "../../../CatalogModule/store";

interface LinkCardProps {
  id: ServiceType | CategoryType; // todo: set selected type in store
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
        border: "1px solid",
        borderColor:
          selected === id
            ? "customColors.labelsSecondary"
            : "customColors.labelsQuaternary",
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
