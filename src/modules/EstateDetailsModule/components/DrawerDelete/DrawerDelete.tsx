import React from "react";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  Box,
  Button,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

import { useEstateDetailsStore } from "../../store";
import { useScreenSize } from "../../../../hooks/useScreenSize";
import { CustomHr } from "../../../../components/CustomHr";

interface DrawerDeleteProps {
  onClick: () => void;
  onDelete: () => void;
}

export const DrawerDelete = ({
  onClick: handleOpenDrawer,
  onDelete,
}: DrawerDeleteProps) => {
  const { isMobile } = useScreenSize();
  const { isDeleteDrawerOpen, setIsDeleteDrawerOpen } = useEstateDetailsStore(
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
              Удалить объект недвижимости?
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
            После удаления восстановить данный объект будет невозможно!
          </Typography>
          <Typography
            component="p"
            variant="textBodyRegular"
            sx={{ marginBottom: 1 }}
          >
            Если Вы хотите временно скрыть данный объект сайта, то
            воспользуйтесь сменой статуса.
          </Typography>
          <Typography component="p" variant="textBodyRegular">
            Подробнее о статусах можно ознакомиться на{" "}
            <Box
              component={Link}
              to="/help/estate"
              sx={{
                color: "customColors.colorsBlue",
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
