import React from "react";
import { MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";

import { useGetUsersQuery } from "../../hooks";
// todo: вынести в shared
import {
  selectInputProps,
  selectStyles,
} from "../../../../components/EstateFormFields/assets/styles";

import { useUpdateSellOrderMutation } from "../../../../shared/hooks/Orders/SellOrders";
import { ResponseSellOrderData } from "../../../../shared/interfaces";

interface SellDetailsSelectUserAgentProps {
  order: ResponseSellOrderData;
  refetchSellOrderDetails: () => void;
}

export const SellDetailsSelectUserAgent = ({
  order,
  refetchSellOrderDetails,
}: SellDetailsSelectUserAgentProps) => {
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError,
  } = useGetUsersQuery();

  const sellOrderDetailsAgentMutation = useUpdateSellOrderMutation({
    refetchSellOrderDetails,
    toastMsgs: {
      success: "Агент успешно назначен!",
      error: "Ошибка при назначении агента.",
    },
  });

  const handleSelectChange = (e: SelectChangeEvent) => {
    const selectedValue = e.target.value;
    sellOrderDetailsAgentMutation.mutate({
      id: order._id,
      data: { estateAgent: selectedValue },
    });
  };

  return (
    <React.Fragment>
      <Typography component="p" variant="textBodyRegular" mb={1}>
        Закрепленный сотрудник:
      </Typography>
      {isLoadingUsers && (
        <Select
          disabled
          displayEmpty
          sx={selectStyles}
          inputProps={{ sx: selectInputProps }}
        >
          <MenuItem disabled>Загрузка пользователей...</MenuItem>
        </Select>
      )}

      {usersData && (
        <Select
          required
          value={order.estateAgent?._id || ""}
          displayEmpty
          sx={selectStyles}
          inputProps={{ sx: selectInputProps }}
          onChange={handleSelectChange}
        >
          <MenuItem disabled value="">
            Выберите агента
          </MenuItem>
          {isError && (
            <MenuItem
              disabled
              value=""
              sx={{ color: "customColors.colorsRed" }}
            >
              Произошла ошибка при загрузке данных, пожалуйста, обратитесь в
              тех. поддержку
            </MenuItem>
          )}
          {usersData &&
            usersData.map((user) => (
              <MenuItem key={user.username} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
        </Select>
      )}
    </React.Fragment>
  );
};
