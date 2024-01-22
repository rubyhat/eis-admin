/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Apartment,
  Flat,
  FormFieldsType,
  House,
  Land,
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
import { apiCreateEstateModule } from "../CreateEstateModule/api";

const livingSpaces = ["apartment", "house", "cottage"];
const houseAndCottage = ["house", "cottage"];

// todo: проверить создание объекта с высотой потолков 2.5 (не целое число)
export const EstateFormModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData, setFormFieldsData } = useCreateEstateStore(
    (state) => state,
  );

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(false);
    setFormFieldsData(data as FormFieldsType);
    const {
      // basic values
      description,
      price,
      discount,
      images,
      videoLink,
      mortgage,
      hasSwap,
      isCommercial,
      isPledge,
      isDocumentsGood,
      type,
      category,
      visibilityStatus,
      // estateAgent, // add data from user info req, need user info req
      geoPosition,
    } = data as FormFieldsType;

    const {
      // Apartment
      roomCount,
      houseBuildingYear,
      houseSquare,
      kitchenSquare,
      countFloor,
      ceilingHeight,
      toiletCount,
      houseCondition,
      houseWallMaterial,
      houseRoofMaterial,
      furniture,
      ethernet,
    } = data as Apartment;

    const {
      // House
      plotSquare,
      hasBasement,
      hasMansard,
      houseType,
      electricType,
      heatingType,
      gasType,
      sewerType,
      toiletType,
      waterType,
    } = data as House;

    const {
      // Flat
      targetFloor,
      totalFloor,
    } = data as Flat;

    const {
      // Land
      landSquare,
    } = data as Land;

    const basicData = {
      description: description,
      price: Number(price),
      discount: Number(discount),
      images: images, // add images
      videoLink: videoLink,
      mortgage: mortgage,
      hasSwap: hasSwap,
      isCommercial: isCommercial,
      isPledge: isPledge,
      isDocumentsGood: isDocumentsGood,
      type: type,
      category: category,
      visibilityStatus: visibilityStatus,
      estateAgent: "65a579da338bf8d0b1ef78e5", // todo: remove this hardcode after tests
      // estateAgent: estateAgent,
      geoPosition: geoPosition,
    };

    const apartmentData = {
      roomCount: Number(roomCount),
      houseBuildingYear: Number(houseBuildingYear),
      houseSquare: Number(houseSquare),
      kitchenSquare: Number(kitchenSquare),
      countFloor: Number(countFloor),
      ceilingHeight: Number(ceilingHeight),
      toiletCount: Number(toiletCount),
      houseCondition: houseCondition,
      houseWallMaterial: houseWallMaterial,
      houseRoofMaterial: houseRoofMaterial,
      furniture: furniture,
      ethernet: ethernet,
    };

    const houseData = {
      plotSquare: Number(plotSquare),
      hasBasement: hasBasement,
      hasMansard: hasMansard,
      houseType: houseType,
      electricType: electricType,
      heatingType: heatingType,
      gasType: gasType,
      sewerType: sewerType,
      toiletType: toiletType,
      waterType: waterType,
    };

    const flatData = {
      targetFloor: Number(targetFloor),
      totalFloor: Number(totalFloor),
    };

    const landData = { landSquare: Number(landSquare) };

    const totalData = {
      apartment: { ...apartmentData, ...flatData },
      cottage: { ...apartmentData, ...houseData },
      house: { ...apartmentData, ...houseData },
      land: { ...landData },
      business: {},
      factory: {},
      other: {},
    };

    const createObjectReq = () => {
      const sendData = {
        ...basicData,
        ...totalData[category],
      };
      // const filteredData = Object.fromEntries(
      //   Object.entries(sendData).filter(([, value]) => value !== ""),
      // );
      const filteredData = Object.entries(sendData).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>,
      );
      apiCreateEstateModule.createObject(filteredData as FormFieldsType); //todo: add success/error notification
    };
    createObjectReq();
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
                <Typography variant="textCalloutRegular">
                  Начните писать текст...
                </Typography>
              )}
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
    </Container>
  );
};
