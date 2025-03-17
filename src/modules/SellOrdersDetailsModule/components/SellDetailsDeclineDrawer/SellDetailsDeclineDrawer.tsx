import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Drawer, TextField, Typography } from "@mui/material";
import { SellOrderStatusEnum } from "@estate-information-system/shared-types";

import {
  SellDetailsDeclineDataTypes,
  SellDetailsDeclineValidationSchema,
} from "../../validations";
import { buttonsWrapperStyles } from "./styles";
import { useUpdateSellOrderMutation } from "../../../../shared/hooks/Orders/SellOrders";
import { ResponseSellOrderData } from "../../../../shared/interfaces";

interface SellDetailsDeclineDrawerProps {
  order: ResponseSellOrderData;
  openDeclineDrawer: boolean;
  setOpenDeclineDrawer: (v: boolean) => void;
  refetchSellOrderDetails: () => void;
}
export const SellDetailsDeclineDrawer = ({
  order,
  openDeclineDrawer,
  setOpenDeclineDrawer,
  refetchSellOrderDetails,
}: SellDetailsDeclineDrawerProps) => {
  const methods = useForm<SellDetailsDeclineDataTypes>({
    defaultValues: { reason: "" },
    resolver: zodResolver(SellDetailsDeclineValidationSchema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  const sellOrderMutation = useUpdateSellOrderMutation({
    refetchSellOrderDetails,
    toastMsgs: {
      success: "Статус заявки успешно обновлен!",
      error: "Ошибка при обновлении статуса.",
    },
  });

  /**
   * Отправляет запрос на отклонение заявки.
   *
   * @param {SellDetailsDeclineDataTypes} data Данные формы (причина блокировки)
   */
  const handleFormSubmit: SubmitHandler<SellDetailsDeclineDataTypes> = ({
    reason,
  }) => {
    // todo: передать на бекенд причину отказа
    sellOrderMutation.mutate({
      id: order._id,
      data: { status: SellOrderStatusEnum.DECLINED, declineReason: reason },
    });
  };

  return (
    <Drawer
      anchor="right"
      open={openDeclineDrawer}
      onClose={() => setOpenDeclineDrawer(false)}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(handleFormSubmit, (error) =>
          console.log("blockUserFormError: ", error),
        )}
        sx={{ p: 2 }}
      >
        <Typography component="h6" variant="titleThirdRegular" mb={2}>
          Вы уверены, что хотите отклонить заявку?
        </Typography>
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Опишите причину отказа"
              type="text"
              sx={{ width: 1 }}
              placeholder="Введите причину блокировки"
              error={!!errors["reason"]}
              helperText={errors["reason"]?.message}
              // disabled={blockUserMutation.isPending}
              multiline
              minRows={6}
            />
          )}
        />
        <Box sx={buttonsWrapperStyles}>
          <Button variant="contained">Отмена</Button>
          <Button variant="contained" color="error" type="submit">
            Отклонить заявку
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};
