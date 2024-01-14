import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

const verticalStyles = {
  width: 1,
  paddingBottom: 0.75,
  marginBottom: 0.75,
  borderBottom: "1px solid",
  borderColor: "customColors.labelsQuaternary",
};

const horizontalStyles = { marginRight: 2 };
interface LinkObject {
  title: string;
  to: string;
}

const links: LinkObject[] = [
  { title: "Объекты", to: "/catalog" },
  { title: "Заявки", to: "/" },
  { title: "Сотрудники", to: "/" },
  { title: "Обучение", to: "/" },
  { title: "Помощь", to: "/help" },
];

interface MenuListProps {
  isVertical?: boolean;
  onClick?: () => void;
}

export const MenuList = ({ isVertical, onClick }: MenuListProps) => {
  return (
    <Box
      component="ul"
      sx={{
        display: "flex",
        alignItems: isVertical ? "flex-start" : "center",
        flexDirection: isVertical ? "column" : "row",
      }}
    >
      {links.map((link, index) => (
        <Box
          component="li"
          key={index}
          sx={isVertical ? verticalStyles : horizontalStyles}
        >
          <Box
            component={Link}
            to={link.to}
            onClick={onClick && onClick}
            className="text-callout-regular"
            sx={{
              color: "customColors.labelsPrimary",
              "&:hover": {
                color: "customColors.colorsBlue",
                transition: "all 333ms ease",
              },
            }}
          >
            {link.title}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
