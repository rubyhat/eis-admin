import { Box, Container, Grid, Typography } from "@mui/material";
import { Logotype } from "../../../../components/Logotype";
import { useLocation } from "react-router-dom";
import { useScreenSize } from "../../../../hooks/useScreenSize";

export const Footer = () => {
  const location = useLocation();
  const { isMobile } = useScreenSize();
  const addCatalogPadding =
    location.pathname.split("/").includes("catalog") && isMobile;

  return (
    <Box
      component="footer"
      padding="16px 0"
      border="1px solid"
      borderColor="customColors.labelsQuaternary"
      paddingBottom={addCatalogPadding ? "90px" : "16px"}
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Logotype />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography
                variant="textCalloutRegular"
                color="customColors.labelsSecondary"
              >
                © 2019–2024 Все права защищены
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
