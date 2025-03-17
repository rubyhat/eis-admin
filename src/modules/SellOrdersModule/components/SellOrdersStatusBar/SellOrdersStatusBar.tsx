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

  const currentStatus = searchParams.get("status") || SellOrderStatusEnum.NEW;

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
        <MenuItem value={SellOrderStatusEnum.NEW} sx={menuItemStyles}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.NEW])}
            />
            Новые заявки
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.WAITING}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.WAITING])}
            />
            Ожидают встречи
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.IN_WORK}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.IN_WORK])}
            />
            В работе
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.DECLINED}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.DECLINED])}
            />
            Завершены
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.COMPLETED}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(
                statusColorMap[SellOrderStatusEnum.COMPLETED],
              )}
            />
            Отклонены
          </Box>
        </MenuItem>
        <MenuItem value={SellOrderStatusEnum.COMPLETED}>
          <Box sx={menuItemStyles}>
            <Box
              sx={statusDotStyles(statusColorMap[SellOrderStatusEnum.CANCELED])}
            />
            Отменены клиентом
          </Box>
        </MenuItem>
      </Select>
    </Box>
  );
};
