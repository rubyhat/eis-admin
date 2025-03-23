import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { RxHamburgerMenu } from "react-icons/rx";
import { IconButton } from "@mui/material";

import { Logotype } from "../../../../components/Logotype";
import { MenuList } from "../MenuList";
import { useHeaderStore } from "../../store/useHeaderStore";
import { CustomButton } from "../../../../components/CustomButton";
import { DrawerMenu } from "../DrawerMenu";
import { useScreenSize } from "../../../../hooks/useScreenSize";
import { useNavigate } from "react-router-dom";
import { useLoginStore } from "../../../LoginModule/store";
import { LogoutButton } from "../LogoutButton";

export const Header = () => {
  const navigate = useNavigate();
  const { isTablet, isMobile } = useScreenSize();
  const { isAuth } = useLoginStore((state) => state);

  const { setIsHeaderBurgerOpen } = useHeaderStore((state) => state);

  const handleBurgerIconClick = () => setIsHeaderBurgerOpen(true);

  if (!isAuth) {
    return (
      <Box
        component="header"
        sx={{
          padding: isMobile ? "8px 0" : "16px 0",
          borderBottom: "1px solid",
          borderColor: "customColors.labelsQuaternary",
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Logotype />
                <CustomButton
                  variant="contained"
                  size="medium"
                  onClick={() => navigate("/login")}
                  sx={{ marginLeft: "auto" }}
                >
                  Войти
                </CustomButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  }
  return (
    <Box
      component="header"
      sx={{
        padding: isMobile ? "8px 0" : "16px 0",
        borderBottom: "1px solid",
        borderColor: "customColors.labelsQuaternary",
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} md={3}>
            <Logotype />
          </Grid>
          <Grid item xs={4} md={9} display="flex" justifyContent="end">
            {isTablet || isMobile ? (
              <IconButton color="primary" onClick={handleBurgerIconClick}>
                <RxHamburgerMenu />
              </IconButton>
            ) : (
              <React.Fragment>
                <MenuList />
                <CustomButton
                  variant="contained"
                  size="medium"
                  onClick={() => navigate("/estate/create")}
                >
                  + Добавить объект
                </CustomButton>
                <LogoutButton />
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Container>
      <DrawerMenu onClick={handleBurgerIconClick} />
    </Box>
  );
};
