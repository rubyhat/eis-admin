import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { DrawerDelete } from "../DrawerDelete";
import { useEstateDetailsStore } from "../../store";
import { apiEstateDetailsModule } from "../../api/apiEstateDetailsModule";
import toast from "react-hot-toast";

export const TitleGroup = () => {
  const navigate = useNavigate();
  const { setIsDeleteDrawerOpen } = useEstateDetailsStore((state) => state);

  const handleClickEditButton = () => navigate("/catalog/123/edit");
  const handleClickDeleteButton = () => setIsDeleteDrawerOpen(true);
  const handleDeleteEstateObject = async () => {
    try {
      await apiEstateDetailsModule.deleteEstate("");
      setIsDeleteDrawerOpen(false);
      toast.success("Объект успешно удален!");
    } catch (error) {
      console.log(error);
      toast.error("Извините, произошла ошибка, попробуйте повторить позднее.");
    }
  };

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
      <DrawerDelete
        onClick={handleClickDeleteButton}
        onDelete={handleDeleteEstateObject}
      />
    </Box>
  );
};
