import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { CustomButton } from "../../components/CustomButton";
import {
  FormFieldsData,
  useCreateEstateStore,
} from "../CreateEstateModule/store";
import { useFormFields } from "./hooks/useFormFields";
import { BasicFormFields } from "./components/BasicFormFields";
import { HomeFormFields } from "./components/HomeFormFields";
import { ApartmentFormFields } from "./components/ApartmentFormFields";
import { HouseFormFileds } from "./components/HouseFormFileds";

export const EstateFormModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData } = useCreateEstateStore((state) => state);
  const { handleSubmit, updateFormFields } = useFormFields();

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(false);
    updateFormFields(data as FormFieldsData);

    console.log(data);

    // estateAgent: {
    //   id: 1,
    //   name: "Артур Розе",
    //   avatar: "",
    //   phone: "",
    // },
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="titleFirstRegular">
              Добавить новый объект недвижимости
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <BasicFormFields isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={3}>
            {(formFieldsData.category === "apartment" ||
              formFieldsData.category === "house") && (
              <>
                <HomeFormFields isLoading={isLoading} />
                {formFieldsData.category === "apartment" && (
                  <ApartmentFormFields isLoading={isLoading} />
                )}
                {formFieldsData.category === "house" && (
                  <HouseFormFileds isLoading={isLoading} />
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomButton type="submit">Добавить</CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
