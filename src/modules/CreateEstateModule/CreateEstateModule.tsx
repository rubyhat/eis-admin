import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { ListLinkStep } from "./components/ListLinkStep";

export const CreateEstateModule = () => {
  const handleListStepSubmit = () => {};
  const handleListStepCancel = () => {};
  return (
    <Container sx={{ height: 1 }}>
      <Grid container spacing={2} sx={{ height: 1 }}>
        <Grid item xs={12} sx={{ height: 1 }}>
          <Box
            sx={{
              width: 1,
              height: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: 1, maxWidth: "470px" }}>
              <ListLinkStep
                onSubmit={handleListStepSubmit}
                onCancel={handleListStepCancel}
                title="Выберите целевое назначение"
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
