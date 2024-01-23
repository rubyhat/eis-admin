import { Box, IconButton, SwipeableDrawer } from "@mui/material";
import React from "react";
import { IoClose } from "react-icons/io5";

import { Logotype } from "../../../../components/Logotype";
import { CustomButton } from "../../../../components/CustomButton";
import { MenuList } from "../MenuList";
import { useHeaderStore } from "../../store/useHeaderStore";
import { useScreenSize } from "../../../../hooks/useScreenSize";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../../LoginModule/store";
import { CustomHr } from "../../../../components/CustomHr";

interface DrawerMenuProps {
  onClick: () => void;
}

export const DrawerMenu = ({
  onClick: handleBurgerIconClick,
}: DrawerMenuProps) => {
  const navigate = useNavigate();
  const { isMobile } = useScreenSize();
  const { isHeaderBurgerOpen, setIsHeaderBurgerOpen } = useHeaderStore(
    (state) => state,
  );
  const { user } = useLoginStore((state) => state);

  const handleCloseBurgerMenu = (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsHeaderBurgerOpen(false);
  };

  const handleProfileButtonClick = () => {
    setIsHeaderBurgerOpen(false);
    navigate("/users/" + user?._id);
  };

  const handleClickAddEstate = () => {
    setIsHeaderBurgerOpen(false);
    navigate("/catalog/create");
  };

  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "right"}
      open={isHeaderBurgerOpen}
      onClose={handleCloseBurgerMenu}
      onOpen={handleBurgerIconClick}
      PaperProps={{
        sx: {
          width: isMobile ? "100%" : "300px",
          borderRadius: isMobile ? "8px 8px 0 0" : "inherit",
        },
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 1.5,
            borderBottom: "1px solid",
            borderColor: "customColors.labelsQuaternary",
          }}
        >
          <Logotype />
          <IconButton onClick={handleCloseBurgerMenu}>
            <IoClose />
          </IconButton>
        </Box>
        {user && (
          <Box padding={1.5} paddingBottom={0}>
            <CustomButton onClick={handleProfileButtonClick}>
              Мой профиль
            </CustomButton>
            <CustomHr sx={{ marginBottom: 0 }} />
          </Box>
        )}
        <Box padding={1.5}>
          <MenuList isVertical onClick={() => setIsHeaderBurgerOpen(false)} />
          <CustomButton
            variant="contained"
            size="large"
            fullWidth
            sx={{ marginTop: 2 }}
            onClick={handleClickAddEstate}
          >
            + Добавить объект
          </CustomButton>
        </Box>
      </Box>
    </SwipeableDrawer>
  );
};
