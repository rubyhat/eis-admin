import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Typography } from "@mui/material";
import { DrawerDelete } from "../DrawerDelete";
import { useEstateDetailsStore } from "../../store";
import { apiEstateDetailsModule } from "../../api/apiEstateDetailsModule";
import toast from "react-hot-toast";
import { DisplayEstateObject } from "../../../../shared/interfaces/EstateObjectTypes";
import { useUserStore } from "../../../UserModule/store/useUserStore";

interface TitleGroupProps {
  estateDetails: DisplayEstateObject;
}

export const TitleGroup = ({ estateDetails }: TitleGroupProps) => {
  const navigate = useNavigate();
  const { setIsDeleteDrawerOpen } = useEstateDetailsStore((state) => state);
  const { isAdmin, isManager, user } = useUserStore();
  const canEdit = user?._id === estateDetails.estateAgent?._id;

  const handleClickEditButton = () => {
    navigate("/estate/edit", { state: { estateDetails } });
  };
  const handleClickDeleteButton = () => setIsDeleteDrawerOpen(true);
  const handleDeleteEstateObject = async () => {
    try {
      await apiEstateDetailsModule.deleteEstate(estateDetails._id);
      setIsDeleteDrawerOpen(false);
      toast.success("Объект успешно удален!");
      navigate("/catalog");
    } catch (error) {
      console.log(error);
      setIsDeleteDrawerOpen(false);
      toast.error("Извините, произошла ошибка, попробуйте повторить позднее.");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography variant="titleLargeRegular" display="block">
        {estateDetails.geoPosition.street},{" "}
        {estateDetails.geoPosition.houseNumber}
      </Typography>
      <Box sx={{ display: { xs: "none", md: "inherit" }, marginLeft: 2 }}>
        {(canEdit || isManager || isAdmin) && (
          <IconButton onClick={handleClickEditButton} color="primary">
            <FiEdit2 size={20} />
          </IconButton>
        )}
        {isAdmin && (
          <IconButton
            onClick={handleClickDeleteButton}
            sx={{ marginLeft: 1 }}
            color="error"
          >
            <AiOutlineDelete size={20} />
          </IconButton>
        )}
      </Box>
      <DrawerDelete
        onClick={handleClickDeleteButton}
        onDelete={handleDeleteEstateObject}
      />
    </Box>
  );
};
