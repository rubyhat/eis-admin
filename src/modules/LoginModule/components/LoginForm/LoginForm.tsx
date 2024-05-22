import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Alert, Box, Typography } from "@mui/material";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";

import { useLoginStore } from "../../store";
import { LoginProps, apiLoginModule } from "../../api";
import { CustomInput } from "../../../../components/CustomInput";
import { CustomButton } from "../../../../components/CustomButton";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useUserStore } from "../../../UserModule/store/useUserStore";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  const [errorCode, setErrorCode] = React.useState<number | null>(null);
  const { setIsAuth } = useLoginStore((state) => state);
  const { setUser, setIsAdmin, setIsManager } = useUserStore((state) => state);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const parseJWT = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(""),
    );

    const userData = JSON.parse(jsonPayload);
    setUser({ ...userData, _id: userData.id });
    setIsAdmin(userData.role === "Admin");
    setIsManager(userData.role === "Manager");
    localStorage.setItem(
      "user",
      JSON.stringify({ ...userData, _id: userData.id }),
    );
  };

  const sendLogin = async (data: LoginProps) => {
    setIsLoading(true);
    try {
      await apiLoginModule.login(data).then((response) => {
        if (response && response.accessToken) parseJWT(response.accessToken);
      });
      toast.success("Авторизация прошла успешно!");
      setIsAuth(true);
      navigate("/");
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null) {
        // Приведение типа error к нужному интерфейсу
        const axiosError = error as { status?: number; message?: string };
        if (axiosError.status === 401) {
          toast.error("Введен не правильный логин или пароль");
        }
        if (axiosError.status === 404) {
          toast.error("Такого пользователя не существует");
        }

        if (axiosError.status) setErrorCode(axiosError.status);
      } else {
        // Обработка других типов ошибок
        toast.error(
          "Извините, произошла ошибка, попробуйте повторить позднее.",
        );
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(false);
    sendLogin({
      username: data.username,
      password: data.password,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="titleSecondRegular">Авторизация</Typography>
      {errorCode && (
        <Box margin={"8px 0 12px 0"}>
          {errorCode === 404 && (
            <Alert severity="error">
              Такого пользователя не существует. Проверьте введенные данные и
              попробуйте еще раз.
            </Alert>
          )}
          {errorCode === 401 && (
            <Alert severity="error">
              Не правильный логин или пароль. Проверьте введенные данные и
              попробуйте еще раз.
            </Alert>
          )}
        </Box>
      )}
      <CustomInput
        id="username"
        register={register}
        errors={errors}
        disabled={isLoading}
        formatPrice={false}
        placeholder="Логин"
        sx={{ marginBottom: 2, marginTop: 2 }}
        required
      />
      <Box sx={{ display: "flex", width: 1, marginBottom: 2 }}>
        <CustomInput
          id="password"
          register={register}
          errors={errors}
          disabled={isLoading}
          formatPrice={false}
          placeholder="Пароль"
          sx={{ width: 1 }}
          type={isShowPassword ? "text" : "password"}
          required
        />
        <CustomButton
          size="small"
          sx={{ marginLeft: 1 }}
          onClick={() => setIsShowPassword((prev) => !prev)}
        >
          {isShowPassword ? (
            <IoEyeOffOutline size={20} />
          ) : (
            <IoEyeOutline size={20} />
          )}
        </CustomButton>
      </Box>
      <CustomButton fullWidth type="submit" disabled={isLoading}>
        Авторизоваться
      </CustomButton>
    </Box>
  );
};
