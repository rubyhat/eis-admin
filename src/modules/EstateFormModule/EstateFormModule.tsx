import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { CustomButton } from "../../components/CustomButton";
import {
  FormFieldsData,
  useCreateEstateStore,
} from "../CreateEstateModule/store";
import { BasicFormFields } from "./components/BasicFormFields";
import { HomeFormFields } from "./components/HomeFormFields";
import { ApartmentFormFields } from "./components/ApartmentFormFields";
import { HouseFormFileds } from "./components/HouseFormFileds";
import { ImagesFormField } from "./components/ImagesFormField";
import { LandFormFields } from "./components/LandFormFields";
import { RichTextEditorField } from "./components/RichTextEditorField";

const livingSpaces = ["apartment", "house", "cottage"];
const houseAndCottage = ["house", "cottage"];

export const EstateFormModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData, setFormFieldsData } = useCreateEstateStore(
    (state) => state,
  );

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(false);
    setFormFieldsData(data as FormFieldsData);

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

  const methods = useForm<FieldValues>({
    defaultValues: {
      ...formFieldsData,
    },
  });

  return (
    <Container>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(handleFormSubmit)}>
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
              <RichTextEditorField />
              <ImagesFormField onImagesUpload={onImagesUpload} />
              <CustomButton type="submit">Добавить</CustomButton>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Container>
  );
};
