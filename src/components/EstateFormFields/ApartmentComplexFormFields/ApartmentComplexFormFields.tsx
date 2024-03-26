import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { CustomInput } from "../../CustomInput";
import { useFormContext } from "react-hook-form";

interface ApartmentComplexFormFieldsProps {
  isLoading: boolean;
}

export const ApartmentComplexFormFields = ({
  isLoading,
}: ApartmentComplexFormFieldsProps) => {
  const { register, formState } = useFormContext();
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
            Название ЖК
          </Typography>
          <CustomInput
            id="apartmentComplex.title"
            register={register}
            errors={formState.errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: Green City Park"
          />
        </Box>
      </Grid>
    </Grid>
  );
};
