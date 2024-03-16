/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import {
  Apartment,
  Flat,
  FormFieldsType,
  House,
  Land,
} from "../../shared/interfaces/EstateObjectTypes";
import { useScreenSize } from "../../hooks/useScreenSize";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CustomButton } from "../../components/CustomButton";
import { CustomHr } from "../../components/CustomHr";
import {
  ApartmentFormFields,
  BasicFormFields,
  HomeFormFields,
  HouseFormFileds,
  ImagesFormField,
  LandFormFields,
  RichTextEditorField,
} from "../../components/EstateFormFields";
import { apiCreateEstateFormModule } from "./api";
import { useCreateEstateFormStore } from "./store/useCreateEstateFormStore";
import {
  FormFieldsDataInitial,
  houseAndCottage,
  livingSpaces,
} from "../../shared/constants/FormFieldsDataInitital";
import { LoadingSplashScreen } from "../../components/LoadingSplashScreen";
import { useCreateEstateStore } from "../CreateEstateModule/store";
import { OwnerFormFields } from "../../components/EstateFormFields/OwnerFormFields";

export const CreateEstateFormModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData, setFormFieldsData } = useCreateEstateFormStore(
    (state) => state,
  );
  const { setStep } = useCreateEstateStore((state) => state);
  const [descriptionTempText, setDescriptionTempText] = React.useState(
    formFieldsData.description || "",
  );
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();

  // Перечисление всех свойств это дичь, нужно будет подумать как переделать
  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    // setIsLoading(true);
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
      pledge,
      isDocumentsGood,
      type,
      category,
      visibilityStatus,
      estateAgent,
      geoPosition,
      ownerInfo,
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
      garage,
      parkingSeat,
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
      images: images,
      videoLink: videoLink,
      mortgage: mortgage,
      hasSwap: hasSwap,
      isCommercial: isCommercial,
      pledge: pledge,
      isDocumentsGood: isDocumentsGood,
      type: type,
      category: category,
      visibilityStatus: visibilityStatus,
      estateAgent: estateAgent,
      geoPosition: geoPosition,
      ownerInfo: ownerInfo,
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
      garage: garage,
      parkingSeat: parkingSeat,
    };

    const houseData = {
      plotSquare: plotSquare,
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
      townhouse: {},
      business: {},
      factory: {},
      other: {},
    };

    const createObjectReq = () => {
      const sendData = {
        ...basicData,
        ...totalData[category],
      };

      const filteredData = Object.entries(sendData).reduce(
        (acc, [key, value]) => {
          if (value !== "" && value !== null) {
            acc[key] = value;
          }
          return acc;
        },
        {} as Record<string, any>,
      );

      const formData = new FormData();
      Object.entries(filteredData).forEach(([key, value]) => {
        if (key === "geoPosition" || key === "ownerInfo") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "images" && value instanceof FileList) {
          for (const file of value) {
            formData.append("images", file);
          }
        } else {
          formData.append(key, value);
        }
      });

      apiCreateEstateFormModule
        .createObject(formData)
        .then((response) => {
          if (response) {
            toast.success("Объект успешно создан!");
            navigate("/catalog/" + response._id);
            // Сбравсываем состояние формы
            setStep(1);
            setFormFieldsData(FormFieldsDataInitial);
          }
        })
        .catch(() => {
          toast.error(
            "Произошла ошибка! Пожалуйста, обратитьесь в тех. поддержку",
          );
        })
        .finally(() => setIsLoading(false));
    };
    createObjectReq();
  };

  const methods = useForm<FieldValues>({
    defaultValues: {
      ...formFieldsData,
    },
  });

  const onImagesUpload = (files: FileList) => {
    methods.setValue("images", files);
  };

  return (
    <Container>
      <FormProvider {...methods}>
        <Box component="form" onSubmit={methods.handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: { xs: "flex-start", md: "center" },
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Typography
                  component="h1"
                  variant="titleFirstRegular"
                  width={1}
                >
                  Добавить новый объект недвижимости
                </Typography>
                <Box
                  sx={{
                    display: { xs: "none", md: "inherit" },
                    marginLeft: "auto",
                  }}
                >
                  <CustomButton
                    type="submit"
                    size={isMobile ? "large" : "small"}
                    sx={{
                      width: { xs: 1, md: "fit-content" },
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? "Загрузка..." : "Сохранить"}
                  </CustomButton>
                </Box>
              </Box>
              <CustomHr />
            </Grid>
          </Grid>
          <Typography
            component="h6"
            variant="titleThirdRegular"
            marginBottom={1}
          >
            Данные собственника
          </Typography>
          <OwnerFormFields isLoading={isLoading} />
          <CustomHr />
          <Typography
            component="h6"
            variant="titleThirdRegular"
            marginBottom={1}
          >
            Базовые свойства
          </Typography>
          <BasicFormFields
            isLoading={isLoading}
            formFieldsData={formFieldsData}
            setFormFieldsData={setFormFieldsData}
          />
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
                Фотографии и описание
              </Typography>
            </Grid>
            <ImagesFormField onImagesUpload={onImagesUpload} />
            <Grid item xs={12} md={6}>
              <RichTextEditorField
                setDescriptionTempText={setDescriptionTempText}
              />
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
              <Box
                className="description-text-block"
                dangerouslySetInnerHTML={{
                  __html: descriptionTempText,
                }}
              ></Box>
              {descriptionTempText === "" && (
                <Typography variant="textCalloutRegular">
                  Начните писать текст...
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <CustomHr />
              <Box
                sx={{ width: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <CustomButton
                  type="submit"
                  size={isMobile ? "large" : "small"}
                  sx={{
                    width: { xs: 1, md: "fit-content" },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Загрузка..." : "Сохранить"}
                </CustomButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </FormProvider>
      <LoadingSplashScreen isLoading={isLoading} />
    </Container>
  );
};
