import React from "react";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { SellOrderStatusEnum } from "@estate-information-system/shared-types";
import {
  menuItemStyles,
  selectStatusWrapperStyles,
  statusDotStyles,
} from "./styles";
import { statusColorMap } from "../../constants";

interface SellOrdersStatusBarProps {
  isLoading: boolean;
}

export const SellOrdersStatusBar = ({
  isLoading,
}: SellOrdersStatusBarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const status = event.target.value;
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (status) {
        newParams.set("status", status);
      } else {
        newParams.delete("status");
      }
      return newParams;
    });
  };

  const currentStatus = searchParams.get("status") || SellOrderStatusEnum.New;

  return (
    <Box sx={selectStatusWrapperStyles}>
      <Select
        required
        displayEmpty
        sx={{ width: 1, maxWidth: 537 }}
        disabled={isLoading}
        value={currentStatus}
        onChange={handleChange}
      >
        <MenuItem disabled value="">
          <Typography
            variant="textCalloutRegular"
            color="customColors.labelsSecondary"
          >
            Выберите статус заявки
          </Typography>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.New} sx={menuItemStyles}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.New])}
            />
            Новые заявки
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.Waiting}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.Waiting])}
            />
            Ожидают встречи
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.InWork}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.InWork])}
            />
            В работе
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.Declined}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.Declined])}
            />
            Завершены
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.Completed}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(
                statusColorMap[SellOrderStatusEnum.Completed],
              )}
            />
            Отклонены
          </Box>
        </MenuItem>
      </Select>
    </Box>
  );
};
