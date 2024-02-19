/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Container, Grid, Typography } from "@mui/material";
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
  FormFieldsData,
  FormFieldsType,
  House,
  Land,
  ObjectImages,
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
import { useEditEstateFormStore } from "./store/editEstateFormStore";
import { apiEditEstateFormModule } from "./api/apiEditEstateFormModule";
import {
  houseAndCottage,
  livingSpaces,
} from "../../shared/constants/FormFieldsDataInitital";
import { LoadingSplashScreen } from "../../components/LoadingSplashScreen";

interface EditEstateFormModuleProps {
  editEstateData: FormFieldsData | Apartment | House | Flat | Land;
  currentImages: ObjectImages[];
  _id: string;
}

export const EditEstateFormModule = ({
  editEstateData,
  currentImages,
  _id,
}: EditEstateFormModuleProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData, setFormFieldsData } = useEditEstateFormStore(
    (state) => state,
  );
  const [descriptionTempText, setDescriptionTempText] = React.useState(
    formFieldsData.description || "",
  );
  const { isMobile } = useScreenSize();
  const navigate = useNavigate();

  const methods = useForm<FieldValues>({
    defaultValues: {
      ...editEstateData,
    },
  });

  const onImagesUpload = (files: FileList) => {
    methods.setValue("images", files);
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
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
      estateAgent,
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
      estateAgent: estateAgent,
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
      business: {},
      factory: {},
      other: {},
    };

    const editObjectReq = () => {
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
        if (key === "geoPosition") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "images" && value instanceof FileList) {
          for (const file of value) {
            formData.append("images", file);
          }
        } else {
          formData.append(key, value);
        }
      });

      apiEditEstateFormModule
        .editObject(formData, _id)
        .then((response) => {
          if (response) {
            toast.success("Объект успешно обновлен!");
            navigate("/catalog/" + _id);
          }
        })
        .catch(() => {
          toast.error(
            "Произошла ошибка! Пожалуйста, обратитьесь в тех. поддержку",
          );
        })
        .finally(() => setIsLoading(false));
    };
    editObjectReq();
  };

  const [clearCurrentImages, setClearCurrentImages] = React.useState<string[]>(
    [],
  );

  React.useEffect(() => {
    const temp: string[] = [];
    if (currentImages)
      currentImages.forEach((image) => {
        temp.push(image.imageUrl);
      });
    setClearCurrentImages(temp);
  }, [currentImages]);

  if (!editEstateData) {
    return (
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Alert severity="error">
              Произошла ошибка, попробуйте вернуться на страницу всех объектов
              недвижимости и открыть редактирование заново. Обратитесь в тех.
              поддержку
            </Alert>
          </Grid>
        </Grid>
      </Container>
    );
  }

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
                  Редактирование объекта недвижимости
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
            <ImagesFormField
              onImagesUpload={onImagesUpload}
              currentImages={clearCurrentImages}
            />
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
