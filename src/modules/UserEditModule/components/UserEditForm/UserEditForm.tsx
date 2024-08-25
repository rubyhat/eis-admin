import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
  useWatch,
} from "react-hook-form";

import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ruRU } from "@mui/x-date-pickers/locales";

import { CustomInput } from "../../../../components/CustomInput";
import { CustomButton } from "../../../../components/CustomButton";
import { useUserStore } from "../../../UserModule/store/useUserStore";
import { EstateAgentInfo } from "../../../../shared/interfaces/EstateObjectTypes";
import { apiUserEdit } from "../../../UserEditModule/api";
import {
  selectInputProps,
  selectStyles,
} from "../../../../components/EstateFormFields/assets/styles";
import dayjs from "dayjs";

interface UserCreateFormProps {
  editUserData: EstateAgentInfo;
}

// todo: надо подумать, давать ли сотрудникам возможность самостоятельно изменять сотовый номер
// что если сменят его на свой личный, а не на корпоративный?
export const UserEditForm = ({ editUserData }: UserCreateFormProps) => {
  const { user, isAdmin } = useUserStore((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      ...editUserData,
      avatar: editUserData.avatar || "",
      birthday: editUserData.birthday ? dayjs(editUserData.birthday) : null,
    },
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

  const sendEditUser = async (data: FormData) => {
    setIsLoading(true);
    try {
      editUserData?._id
        ? await apiUserEdit.editUser(data, editUserData._id)
        : toast.error("Произошла ошибка, попробуйте повторить позднее.");
      toast.success("Пользователь успешно обновлен!");
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

    const cleanData = {
      ...data,
      phone: data.phone.split(" ").join(""),
      birthday: new Date(data.birthday).toISOString(),
    };

    Object.entries(cleanData).forEach(([key, value]) => {
      if (key !== "avatar") {
        if (value !== "" && value !== null) formData.append(key, value);
      } else if (key === "avatar" && value instanceof FileList) {
        formData.append(key, value[0], value[0].name);
      }
    });
    sendEditUser(formData);
  };

  // todo: вынести в переиспользуемую утилиту/компонент
  const handlePhoneInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    if (!value.startsWith("+7")) {
      value = "+7" + value.replace(/[^\d]/g, ""); // Убедимся, что номер начинается с +7
    }
    const cleanValue = value.replace(/[^\d+]/g, ""); // Удаляем все, кроме цифр и знака +
    // Форматируем номер, убираем лишние символы, если они есть
    let formattedValue = cleanValue
      .replace(/(\+\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5")
      .trim(); // Убираем лишние пробелы

    if (formattedValue.length > 16) {
      formattedValue = formattedValue.substring(0, 16);
    }

    setValue("phone", formattedValue, { shouldValidate: true });
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
          Дата рождения
          <Typography
            component="span"
            color="customColors.colorsRed"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          localeText={
            ruRU.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <DatePicker
                label="Дата рождения"
                value={field.value}
                onChange={(newValue) => field.onChange(newValue)}
                sx={{
                  width: 1,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "customColors.labelsQuaternary",
                      borderWidth: 1,
                    },
                  },
                }}
                slotProps={{
                  textField: {
                    error: !!errors.birthday,
                    helperText: errors.birthday ? "Некорректная дата" : "",
                  },
                }}
              />
            )}
          />
        </LocalizationProvider>
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
          type="tel"
          register={register}
          onInput={handlePhoneInput}
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

        {!previewUrl && editUserData?.avatar && (
          <Box
            component="img"
            src={editUserData?.avatar}
            sx={{ width: 1, maxWidth: 512, marginTop: 2, borderRadius: 2 }}
          />
        )}
      </Box>

      {isAdmin && (
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
              placeholder="agent-mail@eis.com"
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
      {(isAdmin || user?._id === editUserData._id) && (
        <>
          <FormControlLabel
            control={
              <Checkbox onChange={(e) => setChangePassword(e.target.checked)} />
            }
            label={
              <Typography component="p" variant="textCalloutRegular">
                Изменить пароль
              </Typography>
            }
          />
          {changePassword && (
            <Box padding="8px 0">
              <Typography
                component="p"
                variant="textBodyRegular"
                marginBottom={0.5}
              >
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
          )}
        </>
      )}
      <Box padding="8px 0">
        <CustomButton size="large" fullWidth type="submit" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Обновить"}
        </CustomButton>
      </Box>
    </Box>
  );
};
