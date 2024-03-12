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
      <Grid item xs={12} md={8} lg={6}>
        <Box marginBottom={1.5} height={1}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Заметка
          </Typography>
          <Box
            component="textarea"
            id="ownerInfo.description"
            {...register("ownerInfo.description", { required: false })}
            disabled={isLoading}
            placeholder="Запишите заметки по объекту и собственнику для других сотрудников"
            sx={{
              width: 1,
              minHeight: 110,
              padding: 1,
              borderColor: formState.errors["ownerInfo.description"]
                ? "customColors.colorsRed"
                : "customColors.labelsQuaternary",
              borderRadius: "5px",
              fontSize: "16px",
              outlineColor: "customColors.colorsOrange",
              "&::placeholder": {
                fontSize: 16,
                color: "customColors.labelsTertiary",
              },
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
