import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

import { DrawerDelete } from "../DrawerDelete";
import { useEstateDetailsStore } from "../../store";
import { CustomButton } from "../../../../components/CustomButton";
import { apiEstateDetailsModule } from "../../api/apiEstateDetailsModule";
import { VisibilityStatusType } from "../../../../shared/interfaces/EstateObjectTypes";
import { apiEditEstateFormModule } from "../../../EditEstateFormModule/api/apiEditEstateFormModule";

interface SettingsButtonBarProps {
  _id: string;
  currentStatus: VisibilityStatusType;
}

export const SettingsButtonBar = ({
  _id,
  currentStatus,
}: SettingsButtonBarProps) => {
  const navigate = useNavigate();
  const { setIsDeleteDrawerOpen } = useEstateDetailsStore((state) => state);
  const [status, setStatus] =
    React.useState<VisibilityStatusType>(currentStatus);

  const handleClickDeleteButton = () => setIsDeleteDrawerOpen(true);
  const handleDeleteEstateObject = async () => {
    try {
      await apiEstateDetailsModule.deleteEstate(_id);
      setIsDeleteDrawerOpen(false);
      toast.success("Объект успешно удален!");
      navigate("/catalog");
    } catch (error) {
      console.log(error);
      setIsDeleteDrawerOpen(false);
      toast.error("Извините, произошла ошибка, попробуйте повторить позднее.");
    }
  };

  const handleChangeStatus = (event: SelectChangeEvent) => {
    const inputStatus = event.target.value as VisibilityStatusType;
    setStatus(inputStatus);
  };

  const handleClickChangeStatusButton = async () => {
    try {
      await apiEditEstateFormModule.editObjecStatus(status, _id);
      toast.success("Статус успешно изменен!");
    } catch (error) {
      toast.error(
        "Извините, произошла ошибка, попробуйте повторить позднее или обратитесь в тех. поддержку.",
        { duration: 5000 },
      );
    }
  };

  if (currentStatus)
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", width: 1 }}>
          <Select
            id="status-select"
            value={status}
            onChange={(e) => handleChangeStatus(e)}
            sx={{
              padding: 0,
              height: "36px",
              fontSize: "15px",
              width: "140px",
              marginRight: 2,
              "& fieldset": {
                borderColor: "customColors.labelsQuaternary",
              },
            }}
            inputProps={{ padding: 1, fontSize: 16 }}
          >
            <MenuItem value={"active"}>Активный</MenuItem>
            <MenuItem value={"sold"}>Проданный</MenuItem>
            <MenuItem value={"checking"}>На проверке</MenuItem>
            <MenuItem value={"canceled"}>Отмененный</MenuItem>
          </Select>
          <CustomButton size="small" onClick={handleClickChangeStatusButton}>
            Сохранить статус
          </CustomButton>
          <Box sx={{ display: { xs: "inherit", md: "none" }, marginLeft: 2 }}>
            <IconButton
              onClick={handleClickDeleteButton}
              sx={{ marginLeft: 1 }}
              color="error"
            >
              <AiOutlineDelete size={20} />
            </IconButton>
            <DrawerDelete
              onClick={handleClickDeleteButton}
              onDelete={handleDeleteEstateObject}
            />
          </Box>
        </Box>
      </Box>
    );
};
