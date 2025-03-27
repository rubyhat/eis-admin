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
import { useFormatDate } from "../../../../shared/hooks/useFormatDate";
import {
  buttonsWrapperStyles,
  cardWrapperStyles,
  infoWrapperStyles,
  titleWrapperStyles,
} from "./styles";

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
  const { dayAndMonth: updateDate, time: updateTime } = useFormatDate(
    order.updatedAt,
  );
  const { dayAndMonth: createDate, time: createTime } = useFormatDate(
    order.createdAt,
  );
  const { isAdmin, isManager } = useUserStore((state) => state);
  const { setIsDeleteDrawerOpen } = useFeedbackOrdersStore((state) => state);

  // todo: move to custom hooks
  const deleteFeedbackMutation = useMutation({
    mutationFn: () =>
      apiFeedbackOrdersModule.deleteFeedbackOrderById(order._id),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["feedback-orders"] });
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
  const handleEditFeedbackOrder = () =>
    navigate(`/orders/feedback/edit`, { state: { order } });

  const handleClickDeleteButton = () => setIsDeleteDrawerOpen(true, order._id);
  const handleDeleteFeedbackOrder = () => {
    deleteFeedbackMutation.mutate();
  };

  return (
    <Box sx={cardWrapperStyles(statusColorValue[order.status])}>
      <Box sx={titleWrapperStyles}>
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

      <Box sx={infoWrapperStyles}>
        <Typography component="h6" variant="textBodyRegular" fontWeight={500}>
          Информация от сотрудника
        </Typography>

        <Box>
          {(isAdmin || isManager) && (
            <IconButton onClick={handleEditFeedbackOrder} color="primary">
              <FiEdit2 size={20} />
            </IconButton>
          )}
          {isAdmin && (
            <>
              <IconButton color="error" onClick={handleClickDeleteButton}>
                <MdDeleteOutline />
              </IconButton>
              <FeedbackOrderDeleteDrawer
                onClick={handleClickDeleteButton}
                onDelete={handleDeleteFeedbackOrder}
                orderId={order._id}
              />
            </>
          )}
        </Box>
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

      <Box sx={{ padding: "8px 0" }}>
        <Typography component="p" variant="textFootnoteRegular">
          Дата создания:{" "}
          <Typography
            variant="textFootnoteEmphasized"
            component="span"
            color="customColors.colorsOrange"
          >
            {createDate} в {createTime}
          </Typography>
        </Typography>
        <Typography component="p" variant="textFootnoteRegular">
          Дата обновления:{" "}
          <Typography
            variant="textFootnoteEmphasized"
            component="span"
            color="customColors.colorsOrange"
          >
            {updateDate} в {updateTime}
          </Typography>
        </Typography>
      </Box>

      <CustomHr sx={{ margin: "8px 0 16px" }} />

      <Box sx={buttonsWrapperStyles}>
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
      <Box>
        <CustomButton fullWidth onClick={handleClickOpenEstateButton}>
          Посмотреть Объект
        </CustomButton>
      </Box>
    </Box>
  );
};
