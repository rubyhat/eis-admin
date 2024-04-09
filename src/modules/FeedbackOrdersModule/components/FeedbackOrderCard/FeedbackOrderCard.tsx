import React from "react";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FeedbackOrderDisplay, useFeedbackOrdersStore } from "../../store";
import { apiFeedbackOrdersModule } from "../../api";
import { CustomHr } from "../../../../components/CustomHr";
import { CustomButton } from "../../../../components/CustomButton";
import { useUserStore } from "../../../UserModule/store/useUserStore";
import { FeedbackOrderDeleteDrawer } from "../FeedbackOrderDeleteDrawer";

interface FeedbackOrderCardProps {
  order: FeedbackOrderDisplay;
}

const statusColorValue = {
  new: "customColors.colorsOrange",
  inWork: "customColors.colorsBlue",
  completed: "customColors.colorsGreen",
};

const statusLabelValue = {
  new: "Новая",
  inWork: "В работе",
  completed: "Завершена",
};

export const FeedbackOrderCard = ({ order }: FeedbackOrderCardProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isAdmin } = useUserStore((state) => state);
  const { setIsDeleteDrawerOpen } = useFeedbackOrdersStore((state) => state);

  const deleteFeedbackMutation = useMutation({
    mutationFn: () =>
      apiFeedbackOrdersModule.deleteFeedbackOrderById(order._id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["feedbackOrders"] });
      toast.success("Заявка успешно удалена!");
    },
    onError() {
      toast.error("Извините, произошла ошибка, обратитесь в тех. поддержку.");
    },
    onSettled() {
      setIsDeleteDrawerOpen(false);
    },
  });

  const handleClickOpenEstateButton = () =>
    navigate(`/catalog/${order.estateId}`);
  const handleEditFeedbackorder = () =>
    navigate(`/orders/feedback/edit`, { state: { order } });

  const handleClickDeleteButton = () => setIsDeleteDrawerOpen(true, order._id);
  const handleDeleteFeedbackOrder = () => {
    deleteFeedbackMutation.mutate();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        border: "2px solid",
        borderColor: statusColorValue[order.status],
        borderRadius: 2,
        height: 1,
      }}
    >
      <Box
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
        }}
      >
        <Typography component="h6" variant="titleThirdRegular" marginBottom={2}>
          {order.title}
        </Typography>
        <Chip
          sx={{
            backgroundColor: statusColorValue[order.status],
            color: "customColors.colorsWhite",
          }}
          label={statusLabelValue[order.status] || "Ошибка"}
          size="small"
        />
      </Box>
      <Typography
        component="h6"
        variant="textBodyRegular"
        fontWeight={500}
        marginTop="auto"
      >
        Информация от пользователя
      </Typography>
      <List>
        <ListItem dense sx={{ padding: 0, paddingBottom: 1 }}>
          <ListItemText
            sx={{ margin: 0 }}
            primary={order.name}
            secondary="Имя"
          />
        </ListItem>
        <ListItem dense sx={{ padding: 0 }}>
          <ListItemText
            sx={{ margin: 0 }}
            primary={
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  component="a"
                  href={`tel:${order.phone}`}
                  sx={{
                    textDecoration: "underline",
                    color: "customColors.colorsOrange",
                  }}
                >
                  {order.phone}
                </Box>
              </Box>
            }
            secondary="Телефон"
          />
        </ListItem>
      </List>
      <CustomHr sx={{ margin: "8px 0" }} />

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component="h6" variant="textBodyRegular" fontWeight={500}>
          Информация от сотрудника
        </Typography>
        {isAdmin && (
          <Box>
            <IconButton onClick={handleEditFeedbackorder} color="primary">
              <FiEdit2 size={20} />
            </IconButton>
            <IconButton color="error" onClick={handleClickDeleteButton}>
              <MdDeleteOutline />
            </IconButton>
            <FeedbackOrderDeleteDrawer
              onClick={handleClickDeleteButton}
              onDelete={handleDeleteFeedbackOrder}
              orderId={order._id}
            />
          </Box>
        )}
      </Box>

      <List>
        <ListItem dense sx={{ padding: 0, paddingBottom: 1 }}>
          <ListItemText
            sx={{ margin: 0 }}
            primary={order.description || "Сообщения от сотрудника нет"}
            secondary="Сообщение от сотрудника"
          />
        </ListItem>
        <ListItem dense sx={{ padding: 0 }}>
          <ListItemText
            sx={{ margin: 0 }}
            primary={
              order.estateAgent?.name || "Заявка не закреплена за сотрудником"
            }
            secondary="Закрепленный сотрудник"
          />
        </ListItem>
      </List>

      <CustomHr sx={{ margin: "8px 0 16px" }} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 1,
          marginBottom: 1,
        }}
      >
        <Box component="a" href={`tel:${order.phone}`}>
          <CustomButton fullWidth>Позвонить</CustomButton>
        </Box>
        <Box
          component="a"
          target="_blank"
          href={`https://api.whatsapp.com/send?phone=${order.phone.slice(
            1,
          )}&text=Здравствуйте, вы оставляли заявку на нашем сайте, по данному объекту недвижимости: \nhttps://roze.kz/catalog/${
            order._id
          }`}
          sx={{
            textDecoration: "underline",
            color: "customColors.colorsGreen",
          }}
        >
          <CustomButton fullWidth isGreenButton>
            Написать
          </CustomButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 1,
        }}
      >
        <CustomButton fullWidth onClick={handleClickOpenEstateButton}>
          Посмотреть Объект
        </CustomButton>
      </Box>
    </Box>
  );
};
