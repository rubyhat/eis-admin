import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

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
}

export const MenuList = ({ isVertical }: MenuListProps) => {
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
          sx={isVertical ? { marginBottom: 0.75 } : { marginRight: 2 }}
        >
          <Box
            component={Link}
            to={link.to}
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
