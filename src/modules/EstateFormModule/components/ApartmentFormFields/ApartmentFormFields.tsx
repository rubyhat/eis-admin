import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomInput } from "../../../../components/CustomInput";
import { useFormFields } from "../../hooks/useFormFields";

interface ApartmentFormFieldsProps {
  isLoading: boolean;
}

export const ApartmentFormFields = ({
  isLoading,
}: ApartmentFormFieldsProps) => {
  const { register, errors } = useFormFields();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          marginBottom: 1.5,
        }}
      >
        <Box>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Этаж
          </Typography>
          <CustomInput
            id="targetFloor"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 2"
          />
        </Box>
        <Typography
          component="p"
          color="customColors.labelsSecondary"
          variant="textCalloutRegular"
          marginTop={3}
        >
          /
        </Typography>
        <Box>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textCalloutRegular"
            marginBottom={0.5}
          >
            Всего
          </Typography>
          <CustomInput
            id="totalFloor"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 5"
          />
        </Box>
      </Box>
    </>
  );
};
