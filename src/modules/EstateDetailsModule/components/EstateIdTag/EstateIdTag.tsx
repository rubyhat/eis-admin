import React from "react";
import { Box, Typography } from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface EstateIdTagProps {
  id: string;
}

export const EstateIdTag = ({ id }: EstateIdTagProps) => {
  const navigate = useNavigate();

  const handleEstateIdClick = () => {
    navigator.clipboard
      .writeText(id)
      .then(() => {
        toast.success("ID объекта успешно скопирован!", { duration: 3000 });
      })
      .catch((err) => {
        toast.error(
          "Не удалось скопировать ID, возможно Ваш браузер заблокировал это действие",
        );
        console.error("Ошибка при копировании: ", err);
      });
  };

  const handleOrdersLinkClick = () =>
    navigate("/orders/feedback?estateId=" + id);

  return (
    <Box sx={{ display: "flex" }}>
      <Typography
        component="p"
        variant="textFootnoteEmphasized"
        onClick={handleEstateIdClick}
      >
        ID:{" "}
        <Typography
          component="span"
          variant="textFootnoteRegular"
          color="primary"
          sx={{ textDecoration: "underline", cursor: "pointer" }}
        >
          {id}
        </Typography>
      </Typography>
      <Typography component="p" variant="textFootnoteEmphasized" margin="0 8px">
        |
      </Typography>
      <Typography
        component="p"
        variant="textFootnoteRegular"
        color="primary"
        sx={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={handleOrdersLinkClick}
      >
        Открыть заявки
      </Typography>
    </Box>
  );
};
