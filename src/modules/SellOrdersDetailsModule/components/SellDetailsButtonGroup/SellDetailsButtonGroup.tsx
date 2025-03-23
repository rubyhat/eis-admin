import React from "react";
import { Box, Button } from "@mui/material";
import { SellOrderStatusEnum } from "@estate-information-system/shared-types";

import { SellDetailsDeclineDrawer } from "../SellDetailsDeclineDrawer";
import { ResponseSellOrderData } from "../../../../shared/interfaces";
import { useUpdateSellOrderMutation } from "../../../../shared/hooks/Orders/SellOrders";
import { useNavigate } from "react-router-dom";

interface SellDetailsButtonGroupProps {
  order: ResponseSellOrderData;
  refetchSellOrderDetails: () => void;
}

export const SellDetailsButtonGroup = ({
  order,
  refetchSellOrderDetails,
}: SellDetailsButtonGroupProps) => {
  const [openDeclineDrawer, setOpenDeclineDrawer] = React.useState(false);
  const navigate = useNavigate();

  const sellOrderMutation = useUpdateSellOrderMutation({
    refetchSellOrderDetails,
    toastMsgs: {
      success: "Статус заявки успешно обновлен!",
      error: "Ошибка при обновлении статуса.",
    },
  });

  const handleClickChangeStatusButton = (newStatus: SellOrderStatusEnum) => {
    sellOrderMutation.mutate({
      id: order._id,
      data: { status: newStatus },
    });
  };

  return (
    <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
      {order.createdObjectId && (
        <Button
          variant="contained"
          sx={{ gridColumn: "1 / 3" }}
          color="primary"
          size="large"
          onClick={() => navigate("/catalog/" + order.createdObjectId)}
        >
          Открыть объект
        </Button>
      )}
      {order.status === SellOrderStatusEnum.NEW && (
        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            handleClickChangeStatusButton(SellOrderStatusEnum.IN_WORK)
          }
        >
          В работу
        </Button>
      )}
      {order.status === SellOrderStatusEnum.IN_WORK && (
        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            handleClickChangeStatusButton(SellOrderStatusEnum.COMPLETED)
          }
        >
          Завершить заявку
        </Button>
      )}
      {[
        SellOrderStatusEnum.NEW,
        SellOrderStatusEnum.IN_WORK,
        SellOrderStatusEnum.WAITING,
      ].includes(order.status) && (
        <React.Fragment>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => setOpenDeclineDrawer(true)}
          >
            Отклонить
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() =>
              handleClickChangeStatusButton(SellOrderStatusEnum.FALSE_ORDER)
            }
            sx={{ gridColumn: "1 / 3" }}
          >
            Ложная заявка
          </Button>
        </React.Fragment>
      )}
      <SellDetailsDeclineDrawer
        openDeclineDrawer={openDeclineDrawer}
        setOpenDeclineDrawer={setOpenDeclineDrawer}
        refetchSellOrderDetails={refetchSellOrderDetails}
        order={order}
      />
    </Box>
  );
};
