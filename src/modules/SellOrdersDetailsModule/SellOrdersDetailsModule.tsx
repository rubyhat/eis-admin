import React from "react";
import { Alert, Box, Container, Grid } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import { useGetSellDetailsQuery } from "./hooks";
import { AxiosErrorAlertMessage } from "../../shared/components/AxiosErrorAlertMessage";
import { SellDetailsOwnerInfoBlock } from "./components/SellDetailsOwnerInfoBlock";
import { SellDetailsBackLink } from "./components/SellDetailsBackLink";
import { AgentCard } from "../../components/AgentCard";

// todo: вынести в shared
import { DetailsList } from "../EstateDetailsModule/components/DetailsList";
import { SellDetailsSelectUserAgent } from "./components/SellDetailsSelectUserAgent";
import { ResponseSellOrderData } from "../../shared/interfaces";
import { SellDetailsButtonGroup } from "./components/SellDetailsButtonGroup";

export const SellOrdersDetailsModule = () => {
  const location = useLocation();
  const { id } = useParams();

  // Проверяем, есть ли данные order в location.state
  const cachedOrder = location.state?.order as ResponseSellOrderData;

  // Если данных в location.state нет, делаем запрос
  const {
    data: fetchOrder,
    error,
    isLoading,
    refetch,
  } = useGetSellDetailsQuery(id, !cachedOrder); // enabled = !cachedOrder

  // Используем данные либо из location.state, либо из запроса
  const order = fetchOrder || cachedOrder;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {error && <AxiosErrorAlertMessage error={error} />}
          {isLoading && "loading..."}
          {!order && !isLoading && !error && (
            <Alert severity="info">Данные о заявке не найдены.</Alert>
          )}
          {order && (
            <SellDetailsBackLink id={order._id} currentStatus={order.status} />
          )}
        </Grid>
        {order && (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              {order.declineReason && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  Причина отклонения заявки:{" "}
                  <strong>{order.declineReason}</strong>
                </Alert>
              )}
              {order.ownerInfo && (
                <SellDetailsOwnerInfoBlock ownerInfo={order.ownerInfo} />
              )}
              {order.estateAgent ? (
                <Box sx={{ mt: 2 }}>
                  <AgentCard estateAgent={order.estateAgent} />
                  <Box sx={{ mt: 2 }}>
                    <SellDetailsSelectUserAgent
                      order={order}
                      refetchSellOrderDetails={refetch}
                    />
                  </Box>
                </Box>
              ) : (
                <React.Fragment>
                  <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
                    Агент не назначен!
                  </Alert>
                  <SellDetailsSelectUserAgent
                    order={order}
                    refetchSellOrderDetails={refetch}
                  />
                </React.Fragment>
              )}
              <Box padding="16px 0">
                <DetailsList estateDetails={order} />
              </Box>
              {order.estateAgent ? (
                <SellDetailsButtonGroup
                  order={order}
                  refetchSellOrderDetails={refetch}
                />
              ) : (
                <Alert
                  // todo: Нужно автоматически проверять закреплен ли сотрудник, если нет,
                  // то перед тем как сменить статус закрепить его автоматически на фоне,
                  // а кнопки отображать всегда, если роль позволяет с ними взаимодействовать
                  severity="warning"
                >
                  Чтобы изменить статус заявки необходимо закрепить сотрудника
                  за данной заявкой
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {order.images.length > 0 && (
                <Box
                  component="img"
                  src={order.images[0].imageUrl}
                  sx={{ width: 1 }}
                />
              )}
            </Grid>
          </React.Fragment>
        )}
      </Grid>
    </Container>
  );
};
