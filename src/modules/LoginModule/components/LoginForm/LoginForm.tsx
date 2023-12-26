import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomInput } from "../../../../components/CustomInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CustomButton } from "../../../../components/CustomButton";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      nickname: "",
      password: "",
    },
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    setIsLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="titleSecondRegular">Авторизация</Typography>
      <CustomInput
        id="nickname"
        register={register}
        errors={errors}
        disabled={isLoading}
        formatPrice={false}
        placeholder="Логин"
        sx={{ marginBottom: 2, marginTop: 2 }}
      />
      <CustomInput
        id="password"
        register={register}
        errors={errors}
        disabled={isLoading}
        formatPrice={false}
        placeholder="Пароль"
        sx={{ marginBottom: 2 }}
        type="password"
      />
      <CustomButton fullWidth type="submit" disabled={isLoading}>
        Авторизоваться
      </CustomButton>
    </Box>
  );
};
