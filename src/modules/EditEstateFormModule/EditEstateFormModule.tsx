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
import { OwnerFormFields } from "../../components/EstateFormFields/OwnerFormFields";
import { ApartmentComplexFormFields } from "../../components/EstateFormFields/ApartmentComplexFormFields";

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

  React.useEffect(() => {
    if (editEstateData) {
      setFormFieldsData(editEstateData);
    }
  }, [editEstateData, setFormFieldsData]);

  const methods = useForm<FieldValues>({
    defaultValues: {
      ...editEstateData,
      images: [],
    },
  });

  // Стейт для уже существующих фото, редактируем его если нужно удалить старое фото
  const [existingImages, setExistingImages] = React.useState<ObjectImages[]>(
    [],
  );

  // Кейс:
  // 1. юзер первый раз нажал на инпут и выбрал фотографию, затем закрыл системное окно загрузки фотографии
  // 2. не отправляя формы, снова нажал на инпут и добавил еще фотографий
  // для этого кейса нам нужно проверять и сохранять фото, которые он грузит при помощи uploadedEarlyImages ,
  // иначе новые фото будут перезаписывать старые фото в стейте реакт хук формы
  const onImagesUpload = (files: FileList) => {
    const uploadedEarlyImages = methods.getValues().images;

    methods.setValue("images", [...uploadedEarlyImages, ...Array.from(files)]);
  };

  // Кейс:
  // 1. юзер нажал на инпут и выбрал фото
  // 2. не отправляя формы, юзер удалил только что загруженное фото
  // в этом случае нам нужно удалить фото не только из превью (это происходит в <ImagesFormField />)
  // но и в стейте реакт хук формы
  // а также очищать стейт реакт хук формы при клике на кнопку "Очистить все"
  const onImagesDelete = (fileName: string, clearAll?: boolean) => {
    const stateImages = methods.getValues().images;

    const filteredStateImages = stateImages.filter(
      (file: File) => file.name !== fileName,
    );

    methods.setValue("images", clearAll ? [] : filteredStateImages);
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
      tiktokLink,
      mortgage,
      exchange,
      isCommercial,
      pledge,
      documents,
      type,
      category,
      visibilityStatus,
      estateAgent,
      geoPosition,
      ownerInfo,
      apartmentComplex,
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
      existingImages: JSON.stringify(
        existingImages.length > 0 ? existingImages : [],
      ),
      videoLink: videoLink,
      tiktokLink: tiktokLink,
      mortgage: mortgage,
      exchange: exchange,
      isCommercial: isCommercial,
      pledge: pledge,
      documents: documents,
      type: type,
      category: category,
      visibilityStatus: visibilityStatus,
      estateAgent: estateAgent,
      geoPosition: geoPosition,
      ownerInfo: {
        ...ownerInfo,
        ownerPhone: ownerInfo.ownerPhone.split(" ").join(""),
      },
      apartmentComplex: apartmentComplex,
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
      notFirstFloor: Number(targetFloor) !== 1,
      notLastFloor: Number(targetFloor) !== Number(totalFloor),
    };

    const landData = { landSquare: Number(landSquare) };

    const totalData = {
      apartment: { ...apartmentData, ...flatData },
      cottage: { ...apartmentData, ...houseData },
      house: { ...apartmentData, ...houseData },
      land: { ...landData },
      townhouse: { ...apartmentData },
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
        if (
          key === "geoPosition" ||
          key === "ownerInfo" ||
          key === "apartmentComplex"
        ) {
          formData.append(key, JSON.stringify(value));
        } else if (key === "images") {
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
              {livingSpaces.includes(formFieldsData.category) && (
                <>
                  <Typography
                    component="h6"
                    variant="titleThirdRegular"
                    marginBottom={1}
                  >
                    Жилой комплекс
                  </Typography>
                  <ApartmentComplexFormFields isLoading={isLoading} />
                  <CustomHr />
                </>
              )}
              {formFieldsData.category === "apartment" && (
                <>
                  <Typography
                    component="h6"
                    variant="titleThirdRegular"
                    marginBottom={1}
                  >
                    Свойства квартиры
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
                    Свойства дома и дачи
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
                Свойства земельного участка
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
              onImagesDelete={onImagesDelete}
              currentImages={currentImages}
              setExistingImages={setExistingImages}
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
