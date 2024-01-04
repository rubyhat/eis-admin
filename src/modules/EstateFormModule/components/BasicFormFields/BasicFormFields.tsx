import React from "react";
import {
  Box,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { selectInputProps, selectStyles } from "../../assets/styles";
import { useFormFields } from "../../hooks/useFormFields";
import { useCreateEstateStore } from "../../../CreateEstateModule/store";
import { CustomInput } from "../../../../components/CustomInput";

interface BasicFormFieldsProps {
  isLoading: boolean;
}

export const BasicFormFields = ({ isLoading }: BasicFormFieldsProps) => {
  const { formFieldsData, setFormFieldsData } = useCreateEstateStore(
    (state) => state,
  );
  const { control, register, errors } = useFormFields();
  return (
    <>
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
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
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
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <Controller
          name="city"
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
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <CustomInput
          required
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
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <CustomInput
          required
          id="price"
          register={register}
          errors={errors}
          disabled={isLoading}
          formatPrice={false}
          placeholder="Например: 42 000 000"
          type="number"
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
          type="number"
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
    </>
  );
};
