import React from "react";
import {
  Box,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

import { CustomInput } from "../../../components/CustomInput";

import {
  Apartment,
  Flat,
  FormFieldsData,
  House,
  Land,
} from "../../../shared/interfaces/EstateObjectTypes";
import { selectInputProps, selectStyles } from "../assets/styles";
import { FetchAllUsers } from "../../../shared/api/apiFetchAllUsers";

interface BasicFormFieldsProps {
  isLoading: boolean;
  formFieldsData: FormFieldsData | Apartment | House | Flat | Land;
  setFormFieldsData: (
    v: FormFieldsData | Apartment | House | Flat | Land,
  ) => void;
}

export const BasicFormFields = ({
  isLoading,
  formFieldsData,
  setFormFieldsData,
}: BasicFormFieldsProps) => {
  const { control, register, formState } = useFormContext();

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError,
  } = useQuery({
    queryFn: () => FetchAllUsers(),
    queryKey: ["usersItems"],
  });

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Тип
            <Typography
              component="span"
              color="customColors.colorsRed"
              variant="textCalloutRegular"
              marginLeft={0.5}
            >
              *
            </Typography>
          </Typography>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                required
                {...field}
                displayEmpty
                sx={selectStyles}
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
            <Typography
              component="span"
              color="customColors.colorsRed"
              variant="textCalloutRegular"
              marginLeft={0.5}
            >
              *
            </Typography>
          </Typography>
          <Controller
            defaultValue="apartment"
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                required
                {...field}
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
                onChange={(e) => {
                  field.onChange(e); // вызов обработчика из react-hooks-form

                  setFormFieldsData({
                    ...formFieldsData,
                    category: e.target.value,
                  });
                }}
              >
                <MenuItem value="apartment">Квартира</MenuItem>
                <MenuItem value="house">Дом</MenuItem>
                <MenuItem value="cottage">Дача</MenuItem>
                <MenuItem value="land">Земельный участок</MenuItem>
                <MenuItem value="business">Бизнес</MenuItem>
                <MenuItem value="factory">Завод или фабрика</MenuItem>
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
            <Typography
              component="span"
              color="customColors.colorsRed"
              variant="textCalloutRegular"
              marginLeft={0.5}
            >
              *
            </Typography>
          </Typography>
          <Controller
            name="visibilityStatus"
            control={control}
            render={({ field }) => (
              <Select
                required
                {...field}
                sx={selectStyles}
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
            <Typography
              component="span"
              color="customColors.colorsRed"
              variant="textCalloutRegular"
              marginLeft={0.5}
            >
              *
            </Typography>
          </Typography>
          {isLoadingUsers ? (
            <Select
              disabled
              displayEmpty
              sx={selectStyles}
              inputProps={{ sx: selectInputProps }}
            >
              <MenuItem disabled>Загрузка пользователей...</MenuItem>
            </Select>
          ) : (
            <Controller
              name="estateAgent"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  {...field}
                  displayEmpty
                  sx={selectStyles}
                  inputProps={{ sx: selectInputProps }}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    field.onChange(selectedValue);

                    setFormFieldsData({
                      ...formFieldsData,
                      estateAgent: selectedValue || "", // Используйте пустую строку по умолчанию, если selectedValue равен null или undefined
                    });
                  }}
                >
                  <MenuItem disabled value="">
                    Выберите агента
                  </MenuItem>
                  {isError && (
                    <MenuItem
                      disabled
                      value=""
                      sx={{ color: "customColors.colorsRed" }}
                    >
                      Произошла ошибка при загрузке данных, пожалуйста,
                      обратитесь в тех. поддержку
                    </MenuItem>
                  )}
                  {usersData &&
                    usersData.map((user) => (
                      <MenuItem key={user.username} value={user._id}>
                        {user.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Город
            <Typography
              component="span"
              color="customColors.colorsRed"
              variant="textCalloutRegular"
              marginLeft={0.5}
            >
              *
            </Typography>
          </Typography>
          <Controller
            name="geoPosition.city"
            control={control}
            render={({ field }) => (
              <Select
                required
                {...field}
                displayEmpty
                sx={selectStyles}
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
                <MenuItem value="Караганда">Караганда</MenuItem>
                <MenuItem value="Пришахтинск">Пришахтинск</MenuItem>
                <MenuItem value="Абай">Абай</MenuItem>
                <MenuItem value="Сарань">Сарань</MenuItem>
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
            Район города
          </Typography>
          <Controller
            name="geoPosition.cityRegion"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: Город
                  </Typography>
                </MenuItem>
                <MenuItem value="Город">Город</MenuItem>
                <MenuItem value="Юго-Восток">Юго-Восток</MenuItem>
                <MenuItem value="Михайловка">Михайловка</MenuItem>
                <MenuItem value="Майкудук">Майкудук</MenuItem>
                <MenuItem value="Федоровка">Федоровка</MenuItem>
                <MenuItem value="Кунгей">Кунгей</MenuItem>
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
            <Typography
              component="span"
              color="customColors.colorsRed"
              variant="textCalloutRegular"
              marginLeft={0.5}
            >
              *
            </Typography>
          </Typography>
          <CustomInput
            required
            id="geoPosition.street"
            register={register}
            errors={formState.errors}
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
            id="geoPosition.houseNumber"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 42"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Стоимость
            <Typography
              component="span"
              color="customColors.colorsRed"
              variant="textCalloutRegular"
              marginLeft={0.5}
            >
              *
            </Typography>
          </Typography>
          <CustomInput
            required
            id="price"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 42 000 000"
            type="number"
            min="0"
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
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 2 000 000"
            type="number"
            min="0"
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
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: https://instagram.com/..."
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
            id="geoPosition.mapLink"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: https://2gis.kz/..."
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography
          component="p"
          color="customColors.labelsSecondary"
          variant="textCalloutRegular"
          marginBottom={0.5}
        >
          Выберите нужное
        </Typography>
        <Box marginBottom={1.5}>
          <Controller
            name="mortgage"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={
                  <Switch
                    {...field}
                    checked={String(field.value) === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
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
                control={
                  <Switch
                    {...field}
                    checked={String(field.value) === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
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
                control={
                  <Switch
                    {...field}
                    checked={String(field.value) === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
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
                control={
                  <Switch
                    {...field}
                    checked={String(field.value) === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
                label="В залоге"
              />
            )}
          />
          <Controller
            name="isDocumentsGood"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={String(field.value) === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
                label="Документы в порядке"
              />
            )}
          />
          <Controller
            name="geoPosition.isInfoHidden"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                {...field}
                control={
                  <Switch
                    {...field}
                    checked={String(field.value) === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
                label="Скрыть адрес"
              />
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
