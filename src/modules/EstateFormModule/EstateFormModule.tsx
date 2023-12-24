import {
  Box,
  Container,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import {
  useForm,
  FieldValues,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import {
  FormFieldsData,
  useCreateEstateStore,
} from "../CreateEstateModule/store";

const selectInputProps = {
  padding: 1,
  fontSize: 16,
};

export const EstateFormModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData, setFormFieldsData } = useCreateEstateStore(
    (state) => state,
  );
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      ...formFieldsData,
    },
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(false);
    setFormFieldsData(data as FormFieldsData);

    console.log(data);
    console.log(setFormFieldsData);

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
            <Typography>Добавить новый объект недвижимости</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Тип
              </Typography>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    sx={{
                      height: "36px",
                      width: "100%",
                      fontSize: "15px",
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "hsla(213, 100%, 53%, 1) !important",
                        },
                      },
                      "& fieldset": {
                        borderColor: "customColors.labelsQuaternary",
                      },
                    }}
                    inputProps={{ sx: selectInputProps }}
                  >
                    <MenuItem disabled value="">
                      <Typography
                        variant="textCalloutRegular"
                        color="customColors.labelsSecondary"
                      >
                        Например: Продажа
                      </Typography>
                    </MenuItem>
                    <MenuItem value="sell">Продажа</MenuItem>
                    <MenuItem value="rent">Аренда</MenuItem>
                  </Select>
                )}
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Категория
              </Typography>
              <Controller
                defaultValue="apartment"
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      height: "36px",
                      width: "100%",
                      fontSize: "15px",
                      "& fieldset": {
                        borderColor: "customColors.labelsQuaternary",
                      },
                    }}
                    inputProps={{ sx: selectInputProps }}
                  >
                    <MenuItem value="apartment">Квартира</MenuItem>
                    <MenuItem value="house">Дома</MenuItem>
                    <MenuItem value="cottage">Дачи</MenuItem>
                    <MenuItem value="land">Земельный участок</MenuItem>
                    <MenuItem value="business">Бизнес</MenuItem>
                    <MenuItem value="factory">Заводы и фабрики</MenuItem>
                    <MenuItem value="other">Другое</MenuItem>
                  </Select>
                )}
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Статус
              </Typography>
              <Controller
                name="visibilityStatus"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    sx={{
                      height: "36px",
                      width: "100%",
                      fontSize: "15px",
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "hsla(213, 100%, 53%, 1) !important",
                        },
                      },
                      "& fieldset": {
                        borderColor: "customColors.labelsQuaternary",
                      },
                    }}
                    inputProps={{ sx: selectInputProps }}
                  >
                    <MenuItem value="checking">На проверке</MenuItem>
                    <MenuItem value="active">Активный</MenuItem>
                    <MenuItem value="sold">Продано</MenuItem>
                    <MenuItem value="canceled">Отменено</MenuItem>
                  </Select>
                )}
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Агент
              </Typography>
              <Controller
                name="estateAgent"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    sx={{
                      height: "36px",
                      width: "100%",
                      fontSize: "15px",
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "hsla(213, 100%, 53%, 1) !important",
                        },
                      },
                      "& fieldset": {
                        borderColor: "customColors.labelsQuaternary",
                      },
                    }}
                    inputProps={{ sx: selectInputProps }}
                  >
                    <MenuItem value="roze">Артур Розе</MenuItem>
                    <MenuItem value="kuzn">Даниил Кузнецов</MenuItem>
                    <MenuItem value="tsay">Владислав Цай</MenuItem>
                  </Select>
                )}
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Город
              </Typography>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    displayEmpty
                    sx={{
                      height: "36px",
                      width: "100%",
                      fontSize: "15px",
                      "&:hover": {
                        "& fieldset": {
                          borderColor: "hsla(213, 100%, 53%, 1) !important",
                        },
                      },
                      "& fieldset": {
                        borderColor: "customColors.labelsQuaternary",
                      },
                    }}
                    inputProps={{ sx: selectInputProps }}
                  >
                    <MenuItem disabled value="">
                      <Typography
                        variant="textCalloutRegular"
                        color="customColors.labelsSecondary"
                      >
                        Например: Караганда
                      </Typography>
                    </MenuItem>
                    <MenuItem value="krg">Караганда</MenuItem>
                    <MenuItem value="ast">Астана</MenuItem>
                    <MenuItem value="alm">Аламата</MenuItem>
                  </Select>
                )}
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Улица
              </Typography>
              <CustomInput
                id="street"
                register={register}
                errors={errors}
                disabled={isLoading}
                formatPrice={false}
                placeholder="Например: ул. Гоголя"
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Дом
              </Typography>
              <CustomInput
                id="houseNumber"
                register={register}
                errors={errors}
                disabled={isLoading}
                formatPrice={false}
                placeholder="Например: 42"
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Ссылка на карту 2gis
              </Typography>
              <CustomInput
                id="mapLink"
                register={register}
                errors={errors}
                disabled={isLoading}
                formatPrice={false}
                placeholder="Например: https://2gis.kz/..."
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Стоимость
              </Typography>
              <CustomInput
                id="price"
                register={register}
                errors={errors}
                disabled={isLoading}
                formatPrice={false}
                placeholder="Например: 42 000 000"
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Скидка
              </Typography>
              <CustomInput
                id="discount"
                register={register}
                errors={errors}
                disabled={isLoading}
                formatPrice={false}
                placeholder="Например: 2 000 000"
              />
            </Box>
            <Box marginBottom={1.5}>
              <Typography
                component="p"
                color="customColors.labelsSecondary"
                variant="textCalloutRegular"
                marginBottom={0.5}
              >
                Ссылка на видео обзор
              </Typography>
              <CustomInput
                id="videoLink"
                register={register}
                errors={errors}
                disabled={isLoading}
                formatPrice={false}
                placeholder="Например: https://instagram.com/..."
              />
            </Box>
            <Box marginBottom={1.5}>
              <Controller
                name="mortgage"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch />}
                    label="Есть ипотека"
                  />
                )}
              />
              <Controller
                name="hasSwap"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch />}
                    label="Есть обмен"
                  />
                )}
              />
              <Controller
                name="isCommercial"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch />}
                    label="Коммерческая недвижимость"
                  />
                )}
              />
              <Controller
                name="isPledge"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch />}
                    label="В залоге"
                  />
                )}
              />
              <Controller
                name="isDocumentsGood"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    {...field}
                    control={<Switch />}
                    label="Документы в порядке"
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            {(formFieldsData.category === "apartment" ||
              formFieldsData.category === "house") && <Box>"hellooooyyy"</Box>}
            <CustomButton type="submit">Добавить</CustomButton>
          </Grid>
          <Grid item xs={12} md={6}>
            photo
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
