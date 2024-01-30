import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { CustomInput } from "../../../../components/CustomInput";
import { useFormContext } from "react-hook-form";

interface ApartmentFormFieldsProps {
  isLoading: boolean;
}

export const ApartmentFormFields = ({
  isLoading,
}: ApartmentFormFieldsProps) => {
  const { register, formState } = useFormContext();
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
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
              type="number"
              register={register}
              errors={formState.errors}
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
              type="number"
              register={register}
              errors={formState.errors}
              disabled={isLoading}
              formatPrice={false}
              placeholder="Например: 5"
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
