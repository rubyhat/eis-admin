import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { IoHomeOutline } from "react-icons/io5";
import { IoDocumentTextOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { IconButton } from "@mui/material";
interface LinkObject {
  title: string;
  to: string;
  icon?: React.ReactNode;
}

const links: LinkObject[] = [
  { title: "Объекты", to: "/catalog", icon: <IoHomeOutline color="#007aff" /> },
  {
    title: "Заявки",
    to: "/orders",
    icon: <IoDocumentTextOutline color="#007aff" />,
  },
  {
    title: "Сотрудники",
    to: "/users",
    icon: <AiOutlineUser color="#007aff" />,
  },
  // { title: "Обучение", to: "/" },
  { title: "Помощь", to: "/help", icon: <BsBook color="#007aff" /> },
];

interface MenuListProps {
  isVertical?: boolean;
  showIcon?: boolean;
  onClick?: () => void;
}

export const MenuList = ({ isVertical, showIcon, onClick }: MenuListProps) => {
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
          sx={
            isVertical
              ? { marginBottom: 0.75, width: 1 }
              : { marginRight: 2, width: 1 }
          }
        >
          <Box
            component={Link}
            to={link.to}
            onClick={onClick && onClick}
            className="text-callout-regular"
            sx={{
              width: 1,
              display: "inline-block",
              color: "customColors.labelsPrimary",
              "&:hover": {
                color: "customColors.colorsBlue",
                transition: "all 333ms ease",
              },
            }}
          >
            {showIcon && <IconButton>{link.icon}</IconButton>}
            {link.title}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
