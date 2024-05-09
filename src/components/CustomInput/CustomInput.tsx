import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { SxProps, Typography, useTheme, Box } from "@mui/material";
import { TbCurrencyTenge } from "react-icons/tb";

interface CustomInputProps {
  id: string;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  label?: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  placeholder?: string;
  sx?: SxProps;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiple?: boolean;
  accept?: string;
  step?: number;
  min?: string;
  onInput?: React.ChangeEventHandler<HTMLInputElement>;
}

export const CustomInput = (props: CustomInputProps) => {
  const {
    id,
    label,
    errors,
    register,
    type = "text",
    disabled,
    formatPrice,
    required,
    placeholder,
    sx,
    onChange,
    multiple,
    accept,
    step,
    min,
    onInput,
  } = props;
  const theme = useTheme();

  return (
    <Box sx={sx}>
      {formatPrice && <TbCurrencyTenge />}
      {label && (
        <Typography
          component="p"
          variant="textCalloutRegular"
          sx={
            errors[id] ? { color: theme.palette.customColors?.colorsRed } : {}
          }
        >
          {label}
        </Typography>
      )}
      <Box
        component="input"
        id={id}
        min={min}
        type={type}
        step={step}
        accept={accept}
        disabled={disabled}
        required={required}
        {...register(id, { required })}
        placeholder={placeholder}
        onChange={onChange}
        multiple={multiple}
        sx={{
          width: 1,
          border: `1px solid`,
          borderColor: errors[id]
            ? theme.palette.customColors?.colorsRed
            : theme.palette.customColors?.labelsQuaternary,
          borderRadius: "5px",
          fontSize: 16,
          padding: 1,
          outlineColor: "customColors.colorsOrange",
          "&::placeholder": {
            fontSize: 16,
            color: theme.palette.customColors?.labelsTertiary,
          },
        }}
        onInput={onInput}
      />
    </Box>
  );
};
