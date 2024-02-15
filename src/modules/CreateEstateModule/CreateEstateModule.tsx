import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { ListLinkStep } from "./components/ListLinkStep";
import { useCreateEstateStore } from "./store";
import useTitle from "../../hooks/useTitle";
import {
  CategoryType,
  ServiceType,
} from "../../shared/interfaces/EstateObjectTypes";
import { CreateEstateFormModule } from "../CreateEstateFormModule";

export const CreateEstateModule = () => {
  useTitle("Добавление нового объекта");
  const { step, listLinkSteps, formFieldsData, setStep, setFormFieldsData } =
    useCreateEstateStore((state) => state);

  const handleCategoryListStepSubmit = (v: string) => {
    setStep(step + 1);
    setFormFieldsData({ ...formFieldsData, category: v as CategoryType }); // todo: stop using as [type]
  };

  const handleServiceListStepSubmit = (v: string) => {
    setStep(step + 1);
    setFormFieldsData({ ...formFieldsData, type: v as ServiceType }); // todo: stop using as [type]
  };
  const handleListStepCancel = () => setStep(step - 1);

  if (step === 3) return <CreateEstateFormModule />;

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
                  onSubmit={handleServiceListStepSubmit}
                  onCancel={handleListStepCancel}
                  title="Выберите целевое назначение"
                  data={listLinkSteps.service}
                />
              )}
              {step === 2 && (
                <ListLinkStep
                  onSubmit={handleCategoryListStepSubmit}
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
