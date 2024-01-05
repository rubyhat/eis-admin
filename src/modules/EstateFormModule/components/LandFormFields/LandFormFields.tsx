import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomInput } from "../../../../components/CustomInput";
import { useFormFields } from "../../hooks/useFormFields";

interface LandFormFieldsProps {
  isLoading: boolean;
}

export const LandFormFields = ({ isLoading }: LandFormFieldsProps) => {
  const { register, errors } = useFormFields();
  return (
    <>
      <Box marginBottom={1.5}>
        <Typography
          component="p"
          color="customColors.labelsSecondary"
          variant="textCalloutRegular"
          marginBottom={0.5}
        >
          Площадь земельного участка
        </Typography>
        <CustomInput
          id="videoLink"
          register={register}
          errors={errors}
          disabled={isLoading}
          formatPrice={false}
          placeholder="Например: 12 соток"
        />
      </Box>
    </>
  );
};
