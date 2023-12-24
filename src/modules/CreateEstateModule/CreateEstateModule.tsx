import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { ListLinkStep } from "./components/ListLinkStep";
import { useCreateEstateStore } from "./store";
import { EstateFormModule } from "../EstateFormModule";

export const CreateEstateModule = () => {
  const { step, setStep, listLinkSteps } = useCreateEstateStore(
    (state) => state,
  );
  const handleListStepSubmit = () => setStep(step + 1);
  const handleListStepCancel = () => setStep(step - 1);

  if (step === 3) return <EstateFormModule />;

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
              {step === 1 && (
                <ListLinkStep
                  onSubmit={handleListStepSubmit}
                  onCancel={handleListStepCancel}
                  title="Выберите целевое назначение"
                  data={listLinkSteps.service}
                />
              )}
              {step === 2 && (
                <ListLinkStep
                  onSubmit={handleListStepSubmit}
                  onCancel={handleListStepCancel}
                  title="Выберите тип объекта недвижимости"
                  data={listLinkSteps.category}
                />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
