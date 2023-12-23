import { Box, Typography } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";

interface LinkCardProps {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export const LinkCard = (props: LinkCardProps) => {
  const { title, subtitle, onClick } = props;
  return (
    <Box
      onClick={onClick && onClick}
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
        <Typography color="customColors.labelsSecondary">Дальше</Typography>
        <IoIosArrowForward size={24} color="#d4d4d4" />
      </Box>
    </Box>
  );
};
