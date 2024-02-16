import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineUser } from "react-icons/ai";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { BsBook } from "react-icons/bs";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { GoGraph } from "react-icons/go";

const list = [
  {
    icon: <IoHomeOutline size={128} color="#DCDCDD" />,
    link: "/catalog",
    disabled: false,
  },
  // {
  //   icon: <IoDocumentTextOutline size={128} color="#DCDCDD" />,
  //   link: "#",
  //   disabled: true,
  // },
  {
    icon: <AiOutlineUser size={128} color="#DCDCDD" />,
    link: "/users",
    disabled: false,
  },
  // {
  //   icon: <GoGraph size={128} color="#DCDCDD" />,
  //   link: "#",
  //   disabled: true,
  // },
  {
    icon: <BsBook size={128} color="#DCDCDD" />,
    link: "/help",
    disabled: true,
  },
];

export const MenuList = () => {
  return (
    <>
      {list.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Box
            component={Link}
            to={item.link}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 1,
              height: 270,
              border: "4px solid",
              borderColor: "customColors.labelsQuaternary",
              borderRadius: 10,
              cursor: item.disabled ? "no-drop" : "pointer",
              transition: "all 333ms ease",
              "&:hover": item.disabled
                ? {}
                : {
                    borderColor: "customColors.labelsSecondary",
                    color: "customColors.labelsSecondary",
                  },
            }}
          >
            {item.icon}
          </Box>
        </Grid>
      ))}
    </>
  );
};
