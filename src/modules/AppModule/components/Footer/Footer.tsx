import { Box, Container, Grid, Typography } from "@mui/material";
import { Logotype } from "../../../../components/Logotype";

export const Footer = () => {
  return (
    <Box
      component="footer"
      padding="16px 0"
      border="1px solid"
      borderColor="customColors.labelsQuaternary"
    >
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Logotype />
              <Typography
                variant="textCalloutRegular"
                color="customColors.labelsSecondary"
                marginLeft={2}
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
