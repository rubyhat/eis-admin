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
import { ImagesFormField } from "./components/ImagesFormField";
import { LandFormFields } from "./components/LandFormFields";

const livingSpaces = ["apartment", "house", "cottage"];
const houseAndCottage = ["house", "cottage"];

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

  const onImagesUpload = (files: FileList) => {
    console.log("files", files);
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
            {livingSpaces.includes(formFieldsData.category) && (
              <>
                <HomeFormFields isLoading={isLoading} />
                {formFieldsData.category === "apartment" && (
                  <ApartmentFormFields isLoading={isLoading} />
                )}
                {houseAndCottage.includes(formFieldsData.category) && (
                  <HouseFormFileds isLoading={isLoading} />
                )}
              </>
            )}
            {formFieldsData.category === "land" && (
              <LandFormFields isLoading={isLoading} />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <ImagesFormField onImagesUpload={onImagesUpload} />
            <CustomButton type="submit">Добавить</CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
