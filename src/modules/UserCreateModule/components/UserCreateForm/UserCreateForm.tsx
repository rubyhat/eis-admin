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
import { EstateAgentInfo } from "../../../../shared/interfaces/EstateObjectTypes";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export const UserCreateForm = () => {
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
      email: "", // todo: нужна ли почта? или создавать всем корпоративную почту?
    },
  });

  const navigate = useNavigate();

  const sendCreaeteUser = async (data: EstateAgentInfo) => {
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
    sendCreaeteUser(data as EstateAgentInfo);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Typography variant="titleSecondRegular">
        Создание нового сотрудника
      </Typography>
      <Box padding="8px 0">
        <Typography component="p" variant="textBodyRegular" marginBottom={0.5}>
          Имя и Фамилия
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
          Логин для входа
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
        <Typography component="p" variant="textBodyRegular" marginBottom={0.5}>
          Сотовый телефон с WhatsApp
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
          Роль в системе
        </Typography>
        <Alert severity="info" sx={{ marginBottom: 1 }}>
          В будущем в зависимости от роли будет ограничиваться функционал для
          сотрудника. Этот параметр в дальнейшем можно будет изменить
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
            </Select>
          )}
        />
      </Box>
      <Box padding="8px 0">
        <CustomButton size="large" fullWidth type="submit">
          Создать
        </CustomButton>
      </Box>
    </Box>
  );
};
