import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

interface LinkObject {
  title: string;
  to: string;
}

const links: LinkObject[] = [
  { title: "Объекты", to: "/kvartiry1" },
  { title: "Заявки", to: "/kvartiry2" },
  { title: "Сотрудники", to: "/kvartiry3" },
  { title: "Обучение", to: "/kvartiry4" },
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
      {links.map((link) => (
        <Box
          component="li"
          key={link.to}
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
