import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";

export const TitleGroup = () => {
  const navigate = useNavigate();

  const handleClickEditButton = () => navigate("/catalog/123/edit");
  const handleClickDeleteButton = () => {};

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="titleLargeRegular" display="block">
        Проспект Нуркена Абдирова, 124/3а
      </Typography>
      <Box marginLeft={2}>
        <IconButton onClick={handleClickEditButton} color="primary">
          <FiEdit2 size={20} />
        </IconButton>
        <IconButton
          onClick={handleClickDeleteButton}
          sx={{ marginLeft: 1 }}
          color="error"
        >
          <AiOutlineDelete size={20} />
        </IconButton>
      </Box>
    </Box>
  );
};
