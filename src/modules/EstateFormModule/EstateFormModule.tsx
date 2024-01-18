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
                  Сохранить
                </CustomButton>
              </Box>
              <CustomHr />
            </Grid>
          </Grid>
          <Typography
            component="h6"
            variant="titleThirdRegular"
            marginBottom={1}
          >
            Базовые свойства
          </Typography>
          <BasicFormFields isLoading={isLoading} />
          <CustomHr />
          {livingSpaces.includes(formFieldsData.category) && (
            <>
              <Typography
                component="h6"
                variant="titleThirdRegular"
                marginBottom={1}
              >
                Общие свойства
              </Typography>
              <HomeFormFields isLoading={isLoading} />
              <CustomHr />
              {formFieldsData.category === "apartment" && (
                <>
                  <Typography
                    component="h6"
                    variant="titleThirdRegular"
                    marginBottom={1}
                  >
                    Cвойства квартиры
                  </Typography>
                  <ApartmentFormFields isLoading={isLoading} />
                  <CustomHr />
                </>
              )}
              {houseAndCottage.includes(formFieldsData.category) && (
                <>
                  <Typography
                    component="h6"
                    variant="titleThirdRegular"
                    marginBottom={1}
                  >
                    Cвойства дома и дачи
                  </Typography>
                  <HouseFormFileds isLoading={isLoading} />
                  <CustomHr />
                </>
              )}
            </>
          )}
          {formFieldsData.category === "land" && (
            <>
              <Typography
                component="h6"
                variant="titleThirdRegular"
                marginBottom={1}
              >
                Cвойства земельного участка
              </Typography>
              <LandFormFields isLoading={isLoading} />
              <CustomHr />
            </>
          )}
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                component="h6"
                variant="titleThirdRegular"
                marginBottom={-1}
              >
                Cвойства дома и дачи
              </Typography>
            </Grid>
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
                }} // add styles for data
              ></Typography>
              {formFieldsData.description === "" && (
                <Typography>Начните писать текст...</Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Container>
  );
};
