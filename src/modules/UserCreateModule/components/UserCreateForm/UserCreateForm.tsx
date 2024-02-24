import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { Alert, Box, MenuItem, Select, Typography } from "@mui/material";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";

import { CustomInput } from "../../../../components/CustomInput";
import { CustomButton } from "../../../../components/CustomButton";
import { apiUserCreate } from "../../api";
import { useUserStore } from "../../../UserModule/store/useUserStore";
import {
  selectInputProps,
  selectStyles,
} from "../../../../components/EstateFormFields/assets/styles";
import { LoadingSplashScreen } from "../../../../components/LoadingSplashScreen";

const initialFormFieldData = {
  name: "",
  username: "",
  phone: "",
  role: "Member",
  password: "", // todo: добавить инпут "подтверждение пароля"
  email: "", // todo: нужна ли почта? или создавать всем корпоративную почту?
  avatar: "",
};

export const UserCreateForm = () => {
  const { user } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { ...initialFormFieldData },
  });

  const navigate = useNavigate();

  const avatar = useWatch({
    control,
    name: "avatar",
  });

  const previewUrl =
    typeof avatar !== "string" && avatar.length > 0
      ? URL.createObjectURL(avatar[0])
      : avatar;

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
        if (value !== "" && value !== null) formData.append(key, value);
      } else if (key === "avatar" && value instanceof FileList) {
        formData.append(key, value[0], value[0].name);
      }
    });
    sendCreaeteUser(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
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
          placeholder="Придумайте надеждный пароль"
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
        <Controller
          name="avatar"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <CustomInput
              id="avatar"
              type="file"
              accept="image/*"
              register={register}
              onChange={(e) => field.onChange(e.target.files)}
              errors={errors}
              disabled={isLoading}
            />
          )}
        />
        {previewUrl && (
          <Box
            component="img"
            src={previewUrl}
            sx={{ width: 1, maxWidth: 512, marginTop: 2, borderRadius: 2 }}
          />
        )}
      </Box>
      {user?.role === "Admin" && (
        <>
          <Box padding="8px 0">
            <Typography
              component="p"
              variant="textBodyRegular"
              marginBottom={0.5}
            >
              Почта{" "}
              <Typography
                component="span"
                color="customColors.colorsRed"
                marginLeft={0.5}
              >
                *
              </Typography>
            </Typography>
            <CustomInput
              id="email"
              register={register}
              errors={errors}
              disabled={isLoading}
              placeholder="agent-mail@eis.com"
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
        <CustomButton size="large" fullWidth type="submit" disabled={isLoading}>
          Создать
        </CustomButton>
      </Box>
      <LoadingSplashScreen isLoading={isLoading} />
    </Box>
  );
};
