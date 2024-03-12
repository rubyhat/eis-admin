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
import { useUsersStore } from "../../store/useUsersStore";
interface UserDeleteDrawerProps {
  onClick: () => void;
  onDelete: () => void;
}

// todo: need create one drawer for deleting user and object?
export const UserDeleteDrawer = ({
  onClick: handleOpenDrawer,
  onDelete,
}: UserDeleteDrawerProps) => {
  const { isMobile } = useScreenSize();
  const { isDeleteDrawerOpen, setIsDeleteDrawerOpen } = useUsersStore(
    (state) => state,
  );
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
              Удалить данного пользователя?
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
            После удаления восстановить данного пользователя будет невозможно!
          </Typography>
          <Typography
            component="p"
            variant="textBodyRegular"
            sx={{ marginBottom: 1 }}
          >
            Перед удалением пользователя, необходимо для всех объектов данного
            пользователя назначить нового агента!
          </Typography>
          <Typography component="p" variant="textBodyRegular">
            Подробнее о пользователях можно ознакомиться на{" "}
            <Box
              component={Link}
              to="/help/estate"
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
