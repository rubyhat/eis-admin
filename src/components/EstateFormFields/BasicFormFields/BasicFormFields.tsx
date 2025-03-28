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
import { useUserStore } from "../../../modules/UserModule/store/useUserStore";
import { useScreenSize } from "../../../hooks/useScreenSize";
import { apiFetchAllUsers } from "../../../shared/api";

interface BasicFormFieldsProps {
  isLoading: boolean;
  mode: "edit" | "create";
  formFieldsData: FormFieldsData | Apartment | House | Flat | Land;
  setFormFieldsData: (
    v: FormFieldsData | Apartment | House | Flat | Land,
  ) => void;
}

export const BasicFormFields = ({
  mode,
  isLoading,
  formFieldsData,
  setFormFieldsData,
}: BasicFormFieldsProps) => {
  const { control, register, formState } = useFormContext();
  const { isAdmin, isManager } = useUserStore((state) => state);
  const { isMobile } = useScreenSize();

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError,
  } = useQuery({
    queryFn: () => apiFetchAllUsers.fetchAllUsers(),
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
                <MenuItem value="townhouse">Таунхаус</MenuItem>
                <MenuItem value="cottage">Дача</MenuItem>
                <MenuItem value="land">Земельный участок</MenuItem>
                <MenuItem value="business">Коммерческая недвижимость</MenuItem>
                {/* <MenuItem value="factory">Завод или фабрика</MenuItem>
                <MenuItem value="other">Другое</MenuItem> */}
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
                disabled={!isAdmin && !isManager}
              >
                <MenuItem value="checking">На проверке</MenuItem>
                <MenuItem value="active">Активный</MenuItem>
                <MenuItem value="sold">Продано</MenuItem>
                <MenuItem value="canceled">Отменено</MenuItem>
                <MenuItem value="rented">Сдан в аренду</MenuItem>
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
                {/* <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: Город
                  </Typography>
                </MenuItem> */}
                <MenuItem value="">Не указывать</MenuItem>
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
          {isMobile && (
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
                  label="Скрыть номер дома"
                />
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
        {mode === "edit" && (
          <Box marginBottom={1.5}>
            <Typography
              component="p"
              color="customColors.labelsSecondary"
              variant="textCalloutRegular"
              marginBottom={0.5}
            >
              Сумма продажи/аренды
            </Typography>
            <CustomInput
              id="soldPrice"
              register={register}
              errors={formState.errors}
              disabled={isLoading}
              formatPrice={false}
              placeholder="Например: 2 000 000"
              type="number"
              min="0"
              sx={{ width: 1 }}
            />
          </Box>
        )}
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Ссылка на TikTok
          </Typography>
          <CustomInput
            id="tiktokLink"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: https://tiktok.com/..."
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Ссылка на видео обзор Instagram
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
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Документы
          </Typography>
          <Controller
            name="documents"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem value="">Не указывать</MenuItem>
                <MenuItem value="good">В порядке</MenuItem>
                <MenuItem value="needUpdate">Нужна корректировка</MenuItem>
                <MenuItem value="needCheck">Нужна проверка</MenuItem>
                <MenuItem value="bad">Есть проблемы</MenuItem>
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
            Залог
          </Typography>
          <Controller
            name="pledge"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem value="">Не указывать</MenuItem>
                <MenuItem value="none">Нет</MenuItem>
                <MenuItem value="bank">Да, у банка</MenuItem>
                <MenuItem value="police">Да, арест</MenuItem>
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
            Ипотека
          </Typography>
          <Controller
            name="mortgage"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem value="">Не указывать</MenuItem>
                <MenuItem value="accepted">Есть</MenuItem>
                <MenuItem value="declined">Нет</MenuItem>
                <MenuItem value="possibly">Под вопросом</MenuItem>
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
            Обмен
          </Typography>
          <Controller
            name="exchange"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem value="">Не указывать</MenuItem>
                <MenuItem value="yes">Есть</MenuItem>
                <MenuItem value="no">Нет</MenuItem>
              </Select>
            )}
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
          {/* todo: нужен ли этот свитч? */}
          {/* <Controller
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
          /> */}
          {!isMobile && (
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
                  label="Скрыть номер дома"
                />
              )}
            />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
