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
import { CustomHr } from "../../components/CustomHr";

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
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography component="h1" variant="titleFirstRegular">
                  Добавить новый объект недвижимости
                </Typography>
                <CustomButton
                  type="submit"
                  size="small"
                  sx={{ marginLeft: "auto" }}
                >
                  + Добавить
                </CustomButton>
              </Box>
              <CustomHr />
            </Grid>
          </Grid>
          <BasicFormFields isLoading={isLoading} />
          <Grid container spacing={2}>
            <ImagesFormField onImagesUpload={onImagesUpload} />
            <Grid item xs={12} md={6}>
              <RichTextEditorField />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Превью описания
              </Typography>
              <Typography
                component="div"
                color="black"
                dangerouslySetInnerHTML={{
                  __html: formFieldsData.description,
                }}
              ></Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
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
          </Grid>
        </Box>
      </FormProvider>
    </Container>
  );
};
