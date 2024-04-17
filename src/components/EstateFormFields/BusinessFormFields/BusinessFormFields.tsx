import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { selectInputProps, selectStyles } from "../assets/styles";

interface BusinessFormFieldsProps {
  isLoading: boolean;
}

export const BusinessFormFields = ({ isLoading }: BusinessFormFieldsProps) => {
  const { control } = useFormContext();

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
            Целевое назначение
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
            name="businessType"
            control={control}
            render={({ field }) => (
              <Select
                required
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
                disabled={isLoading}
              >
                <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: Магазины
                  </Typography>
                </MenuItem>
                <MenuItem value="freeSpace">Свободное помещение</MenuItem>
                <MenuItem value="store">Магазины</MenuItem>
                <MenuItem value="cafe">Кафе и рестораны</MenuItem>
                <MenuItem value="office">Офисы</MenuItem>
                <MenuItem value="areaBase">Базы</MenuItem>
                <MenuItem value="factory">Заводы</MenuItem>
              </Select>
            )}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
