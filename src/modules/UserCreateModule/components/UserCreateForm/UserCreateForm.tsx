import { Alert, Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { CustomInput } from "../../../../components/CustomInput";
import { CustomButton } from "../../../../components/CustomButton";
import {
  selectInputProps,
  selectStyles,
} from "../../../EstateFormModule/assets/styles";
import { apiUserCreate } from "../../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useUserStore } from "../../../UserModule/store/useUserStore";

export const UserCreateForm = () => {
  const { user } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      username: "",
      phone: "",
      role: "Member",
      password: "", // todo: добавить инпут "подтверждение пароля"
      email: "", // todo: нужна ли почта? или создавать всем корпоративную почту?
      avatar: null,
    },
  });

  const navigate = useNavigate();

  const sendCreaeteUser = async (data: FormData) => {
    setIsLoading(true);
    try {
      await apiUserCreate.createUser(data);
      toast.success("Пользователь успешно создан!");
      navigate("/users");
    } catch (error) {
      console.log(error);
      toast.error("Извините, произошла ошибка, попробуйте повторить позднее.");
    } finally {
      setIsLoading(false);
    }
  };

  // todo: normalize phone number
  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "avatar") {
        formData.append(key, value);
      } else if (key === "avatar" && value instanceof FileList) {
        formData.append(key, value[0], value[0].name);
      }
    });

    sendCreaeteUser(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="titleSecondRegular">
        Создание нового сотрудника
      </Typography>
      <Box padding="8px 0">
        <Typography component="p" variant="textBodyRegular" marginBottom={0.5}>
          Имя и Фамилия{" "}
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <CustomInput
          id="name"
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="Артур Розе"
          required
        />
      </Box>
      <Box padding="8px 0">
        <Typography component="p" variant="textBodyRegular" marginBottom={0.5}>
          Логин для входа{" "}
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <CustomInput
          id="username"
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="roze.agent"
          required
        />
      </Box>
      <Box padding="8px 0">
        <Typography component="p" variant="textBodyRegular" marginBottom={0.5}>
          Пароль для входа{" "}
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <CustomInput
          id="password"
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="roze.agent"
          required
        />
      </Box>
      <Box padding="8px 0">
        <Typography component="p" variant="textBodyRegular" marginBottom={0.5}>
          Сотовый телефон с WhatsApp{" "}
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <CustomInput
          id="phone"
          register={register}
          errors={errors}
          disabled={isLoading}
          placeholder="+7 705 123 45 67"
          required
        />
      </Box>
      <Box padding="8px 0">
        <Typography component="p" variant="textBodyRegular" marginBottom={0.5}>
          Фотография
        </Typography>
        <CustomInput
          id="avatar"
          type="file"
          register={register}
          errors={errors}
          disabled={isLoading}
          required
        />
      </Box>
      {user?.role === "Admin" && (
        <>
          <Box padding="8px 0">
            <Typography
              component="p"
              variant="textBodyRegular"
              marginBottom={0.5}
            >
              Почта
            </Typography>
            <CustomInput
              id="email"
              register={register}
              errors={errors}
              disabled={isLoading}
              placeholder="Артур Розе"
              required
            />
          </Box>
          <Box padding="8px 0">
            <Typography
              component="p"
              variant="textBodyRegular"
              marginBottom={0.5}
            >
              Роль в системе{" "}
              <Typography
                component="span"
                color="customColors.colorsRed"
                marginLeft={0.5}
              >
                *
              </Typography>
            </Typography>
            <Alert severity="info" sx={{ marginBottom: 1 }}>
              В будущем в зависимости от роли будет ограничиваться функционал
              для сотрудника. Этот параметр в дальнейшем можно будет изменить
            </Alert>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  {...field}
                  sx={selectStyles}
                  inputProps={{ sx: selectInputProps }}
                >
                  <MenuItem value="Manager">Менеджер</MenuItem>
                  <MenuItem value="Member">Агент</MenuItem>
                  <MenuItem value="Admin">Администратор</MenuItem>
                </Select>
              )}
            />
          </Box>
        </>
      )}
      <Box padding="8px 0">
        <CustomButton size="large" fullWidth type="submit">
          Создать
        </CustomButton>
      </Box>
    </Box>
  );
};
