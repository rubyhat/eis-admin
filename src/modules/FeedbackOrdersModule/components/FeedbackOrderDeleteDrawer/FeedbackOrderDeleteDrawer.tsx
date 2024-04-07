import React from "react";
import {
  Box,
  Button,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CustomHr } from "../../../../components/CustomHr";
import { useScreenSize } from "../../../../hooks/useScreenSize";
import { useFeedbackOrdersStore } from "../../store";

interface UserDeleteDrawerProps {
  onClick: () => void;
  onDelete: () => void;
  orderId: string;
}

// todo: need create one drawer for deleting user and object and feedback orders?
export const FeedbackOrderDeleteDrawer = ({
  onClick: handleOpenDrawer,
  onDelete,
  orderId,
}: UserDeleteDrawerProps) => {
  const { isMobile } = useScreenSize();
  const { isDeleteDrawerOpen, deleteOrderId, setIsDeleteDrawerOpen } =
    useFeedbackOrdersStore((state) => state);

  if (orderId !== deleteOrderId) {
    return null;
  }

  const handleCloseDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsDeleteDrawerOpen(false);
  };

  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "top"}
      open={isDeleteDrawerOpen}
      onClose={handleCloseDrawer}
      onOpen={handleOpenDrawer}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : "600px",
          borderRadius: isMobile ? "8px 8px 0 0" : 2,
          margin: isMobile ? "inherit" : "10% auto",
        },
      }}
    >
      <Box>
        <Box sx={{ padding: 1.5 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography component="h6" variant="titleThirdRegular">
              Удалить данную заявку пользователя?
            </Typography>
            <IconButton onClick={handleCloseDrawer}>
              <IoClose />
            </IconButton>
          </Box>
          <CustomHr />
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.colorsRed"
            sx={{ marginBottom: 1 }}
          >
            После удаления восстановить данную заявку будет невозможно!
          </Typography>
          <Typography component="p" variant="textBodyRegular">
            Подробнее о заявках можно ознакомиться на{" "}
            <Box
              component={Link}
              to="/help/orders"
              sx={{
                color: "customColors.colorsOrange",
                textDecoration: "underline",
              }}
            >
              странице помощи
            </Box>
          </Typography>
          <Button
            fullWidth
            color="error"
            variant="contained"
            sx={{ marginTop: 2 }}
            onClick={() => onDelete()}
          >
            Да, удалить
          </Button>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
