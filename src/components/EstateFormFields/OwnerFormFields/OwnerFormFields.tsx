import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { CustomInput } from "../../CustomInput";

interface OwnerFormFieldsProps {
  isLoading: boolean;
}

export const OwnerFormFields = ({ isLoading }: OwnerFormFieldsProps) => {
  const { register, formState } = useFormContext();
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
            register={register}
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
          >
            Заметка(хозяева, КСК, соседи, брак, долги)
          </Typography>
          <Box
            component="textarea"
            id="ownerInfo.description"
            {...register("ownerInfo.description", { required: false })}
            disabled={isLoading}
            placeholder={`Имена всех хозяев - ?\nКск - ?\nСоседи - ?\nПродавец в браке сейчас/ранее - ?\nДолги по коммунальным платежам - ?`}
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
