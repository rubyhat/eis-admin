import React from "react";
import { useFormContext } from "react-hook-form";

import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import { BsQuestionCircle } from "react-icons/bs";

import { CustomInput } from "../../CustomInput";

interface OwnerFormFieldsProps {
  isLoading: boolean;
}

export const OwnerFormFields = ({ isLoading }: OwnerFormFieldsProps) => {
  const { register, formState, setValue } = useFormContext();

  // todo: вынести в переиспользуемую утилиту/компонент
  const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    if (!value.startsWith("+7")) {
      value = "+7" + value.replace(/[^\d]/g, ""); // Убедимся, что номер начинается с +7
    }
    const cleanValue = value.replace(/[^\d+]/g, ""); // Удаляем все, кроме цифр и знака +
    // Форматируем номер, убираем лишние символы, если они есть
    let formattedValue = cleanValue
      .replace(/(\+\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
      .trim(); // Убираем лишние пробелы

    if (formattedValue.length > 16) {
      formattedValue = formattedValue.substring(0, 16);
    }

    setValue("ownerInfo.ownerPhone", formattedValue, { shouldValidate: true });
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Имя собственника
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
            id="ownerInfo.ownerName"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: Иван"
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Сотовый номер собственника
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
            id="ownerInfo.ownerPhone"
            type="tel"
            register={register}
            onInput={handlePhoneInput}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: +77711234567"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={2}>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Номер квартиры
          </Typography>
          <CustomInput
            id="ownerInfo.apartmentNumber"
            register={register}
            errors={formState.errors}
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
            Номер домофона
          </Typography>
          <CustomInput
            id="ownerInfo.intercomNumber"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 2"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={2}>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Номер подъезда
          </Typography>
          <CustomInput
            id="ownerInfo.entranceNumber"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 2"
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box marginBottom={1.5} height={1}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer",
            }}
          >
            Заметка(хозяева, КСК, соседи, брак, долги)
            <Tooltip
              title={`Заметка по документам - ?\nЗалог, сумма залога? - ?\nКод домофона - ?\nДругое - ?\nВопросы? - ?\nИмена всех хозяев - ?\nКск - ?\nСоседи - ?\nПродавец в браке сейчас/ранее - ?\nДолги по коммунальным платежам - ?`}
            >
              <IconButton size="small">
                <BsQuestionCircle color="#ff6800" />
              </IconButton>
            </Tooltip>
          </Typography>
          <Box
            component="textarea"
            id="ownerInfo.description"
            {...register("ownerInfo.description", { required: false })}
            disabled={isLoading}
            placeholder={`Заметка по документам - ?\nЗалог, сумма залога? - ?\nКод домофона - ?\nДругое - ?\nВопросы? - ?`}
            sx={{
              width: 1,
              minHeight: { xs: 250, sm: 110 },
              padding: 1,
              borderColor: formState.errors["ownerInfo.description"]
                ? "customColors.colorsRed"
                : "customColors.labelsQuaternary",
              borderRadius: "5px",
              fontSize: "16px",
              outlineColor: "customColors.colorsOrange",
              "&::placeholder": {
                fontSize: 14,
                color: "customColors.labelsTertiary",
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
