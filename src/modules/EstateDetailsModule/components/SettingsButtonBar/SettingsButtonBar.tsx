import React from "react";
import {
  Alert,
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { TbCurrencyTenge } from "react-icons/tb";

import { DrawerDelete } from "../DrawerDelete";
import { useEstateDetailsStore } from "../../store";
import { CustomButton } from "../../../../components/CustomButton";
import { apiEstateDetailsModule } from "../../api/apiEstateDetailsModule";
import { VisibilityStatusType } from "../../../../shared/interfaces/EstateObjectTypes";
import { apiEditEstateFormModule } from "../../../EditEstateFormModule/api/apiEditEstateFormModule";
import { useUserStore } from "../../../UserModule/store/useUserStore";
import { DrawerSoldEstateModule } from "../../../DrawerSoldEstateModule";
import { useQueryClient } from "@tanstack/react-query";
import { estateObjectDictionary } from "../../../../shared/dictionaries/EstateObjectDictionary";

interface SettingsButtonBarProps {
  _id: string;
}

export const SettingsButtonBar = ({ _id }: SettingsButtonBarProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    setIsDeleteDrawerOpen,
    estateDetails,
    currentVisibilityStatus,
    setCurrentVisibilityStatus,
  } = useEstateDetailsStore((state) => state);
  const { isAdmin } = useUserStore((state) => state);

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
    setCurrentVisibilityStatus(inputStatus);
  };

  const handleClickChangeStatusButton = async () => {
    try {
      await apiEditEstateFormModule
        .editObjectStatus(currentVisibilityStatus, _id)
        .then(() => {
          // todo: мы берем данные из useLocation на странице estateDetails, поэтому этот метод не совсем подходит. Нужно будет поизучать этот момент
          // queryClient.invalidateQueries({ queryKey: ["estateDetails"] });
          queryClient.fetchQuery({
            queryKey: ["estateDetails", _id],
            queryFn: () => apiEstateDetailsModule.getDetailsById(_id),
          });
        });
      toast.success("Статус успешно изменен!");
    } catch (error) {
      toast.error(
        "Извините, произошла ошибка, попробуйте повторить позднее или обратитесь в тех. поддержку.",
        { duration: 5000 },
      );
    }
  };

  const showSoldPriceBlock =
    estateDetails && ["sold", "rented"].includes(currentVisibilityStatus);

  if (currentVisibilityStatus)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: 1,
        }}
      >
        {!isAdmin && (
          <Alert severity="info" sx={{ width: "fit-content", marginBottom: 2 }}>
            Сменить статус на <strong>Активный</strong> может только{" "}
            <strong>Администратор</strong>
          </Alert>
        )}
        <Box sx={{ display: "flex", alignItems: "center", width: 1 }}>
          <Select
            id="status-select"
            value={currentVisibilityStatus}
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
            <MenuItem value="active" disabled={!isAdmin}>
              Активный
            </MenuItem>
            <MenuItem value="checking">На проверке</MenuItem>
            <MenuItem value="canceled">Отмененный</MenuItem>
            <MenuItem disabled value="sold">
              Проданный
            </MenuItem>
            <MenuItem disabled value="rented">
              Сдан в аренду
            </MenuItem>
          </Select>
          <CustomButton
            disabled={!isAdmin}
            size="small"
            onClick={handleClickChangeStatusButton}
          >
            Сменить статус
          </CustomButton>
          <Box
            sx={{
              display: { xs: "inherit", md: "none" },
              marginLeft: { xs: "auto", md: 2 },
            }}
          >
            <IconButton onClick={handleClickDeleteButton} color="error">
              <AiOutlineDelete size={20} />
            </IconButton>
            <DrawerDelete
              onClick={handleClickDeleteButton}
              onDelete={handleDeleteEstateObject}
            />
          </Box>
        </Box>
        {!["sold", "canceled", "rented"].includes(currentVisibilityStatus) && (
          <Box paddingTop={1.5} maxWidth={568}>
            <DrawerSoldEstateModule />
          </Box>
        )}
        {showSoldPriceBlock && estateDetails.soldPrice && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 1.5,
              marginTop: 1,
              borderRadius: 1,
              maxWidth: 568,
              border: "2px solid",
              borderColor: "customColors.colorsGreen",
            }}
          >
            <Typography component="p" variant="textBodyEmphasized">
              {estateDetails.type === "rent" ? "Сдано в аренду" : "Продано"} за:
            </Typography>
            <Typography
              component="p"
              variant="textBodyRegular"
              marginBottom={1}
            >
              {estateDetails.soldPrice.toLocaleString("ru-RU")}{" "}
              <TbCurrencyTenge />
            </Typography>
            {estateDetails.sourceCustomer && (
              <>
                <Typography component="p" variant="textBodyEmphasized">
                  Источник продажи:
                </Typography>
                <Typography
                  component="p"
                  variant="textBodyRegular"
                  marginBottom={1}
                >
                  {
                    estateObjectDictionary.sourceCustomer[
                      estateDetails.sourceCustomer
                    ]
                  }
                </Typography>
              </>
            )}
            {estateDetails.dealOwner && (
              <>
                <Typography component="p" variant="textBodyEmphasized">
                  Организатор продажи:
                </Typography>
                <Typography
                  component="p"
                  variant="textBodyRegular"
                  marginBottom={1}
                >
                  {estateObjectDictionary.dealOwner[estateDetails.dealOwner]}
                </Typography>
              </>
            )}
          </Box>
        )}
      </Box>
    );
};
