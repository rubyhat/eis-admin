import { Box, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../components/CustomButton";
import { VisibilityStatusType } from "../../../../shared/interfaces/EstateObjectTypes";

export const SettingsButtonBar = () => {
  const [status, setStatus] = React.useState<VisibilityStatusType>("active");

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as VisibilityStatusType);
  };

  const handleClickChangeStatusButton = () => {};

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
          onChange={handleChangeStatus}
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
          Сохранить
        </CustomButton>
      </Box>
    </Box>
  );
};
