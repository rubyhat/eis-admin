import React from "react";
import { FeedbackOrder } from "../../store";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../../../components/CustomButton";
import { CustomHr } from "../../../../components/CustomHr";

interface FeedbackOrderCardProps {
  order: FeedbackOrder;
}

export const FeedbackOrderCard = ({ order }: FeedbackOrderCardProps) => {
  const navigate = useNavigate();

  const handleClickOpenEstateButton = () => navigate(`/catalog/${order._id}`);
  const handleClickEditOrderButton = () =>
    navigate(`/orders/feedback/edit`, { state: order });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: 2,
        border: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: 2,
      }}
    >
      <Typography component="h6" variant="titleThirdRegular">
        {order.title}
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
                    color: "customColors.colorsBlue",
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
          gap: 2,
          marginBottom: 2,
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
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: 2,
        }}
      >
        <CustomButton fullWidth onClick={handleClickEditOrderButton}>
          Редактировать
        </CustomButton>
        <CustomButton fullWidth onClick={handleClickOpenEstateButton}>
          Открыть
        </CustomButton>
      </Box>
    </Box>
  );
};
