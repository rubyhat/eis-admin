import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Box, MenuItem, Select, Typography } from "@mui/material";

import { CustomInput } from "../../../../components/CustomInput";
import { useQuery } from "@tanstack/react-query";
import { FetchAllUsers } from "../../../../shared/api/apiFetchAllUsers";
import { CustomButton } from "../../../../components/CustomButton";
import { useFeedbackOrdersStore } from "../../store";
import { useNavigate } from "react-router-dom";

const selectStyles = {
  height: "36px",
  width: "100%",
  fontSize: "15px",
  "&:hover": {
    "& fieldset": {
      borderColor: "hsla(213, 100%, 53%, 1) !important",
    },
  },
  "& fieldset": {
    borderColor: "customColors.labelsQuaternary",
  },
};

const selectInputProps = {
  padding: 1,
  fontSize: 16,
};

const initialFilterState = {
  phone: "",
  estateId: "",
  estateAgent: "",
};

// todo: add params in url, when form was used, add request, when backend will be ready
export const FeedbackOrderFilterForm = () => {
  const { setIsMobileFilterModalOpen } = useFeedbackOrdersStore(
    (state) => state,
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: initialFilterState,
  });

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError,
  } = useQuery({
    queryFn: () => FetchAllUsers(),
    queryKey: ["usersItems"],
  });

  const navigate = useNavigate();

  const handleFormReset = () => {
    reset(initialFilterState);
    setIsMobileFilterModalOpen(false);
    navigate(""); // Очищаем урл параметры
    // setFilterState(initialFilterState);
    // fetchData(""); // Делаем новый запрос без параметров
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      <Box padding="12px 16px">
        <Typography component="h6" variant="titleSecondRegular">
          Фильтры
        </Typography>
      </Box>
      <Box padding="0px 16px">
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            ID объекта
          </Typography>
          <CustomInput
            id="estateId"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Введите уникальный ID объекта"
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            Номер телефона
          </Typography>
          <CustomInput
            id="phone"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Введите телефон клиента"
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            Агент по недвижимости
          </Typography>
          {isLoadingUsers ? (
            <Select
              disabled
              displayEmpty
              sx={selectStyles}
              inputProps={{ sx: selectInputProps }}
            >
              <MenuItem disabled>Загрузка пользователей...</MenuItem>
            </Select>
          ) : (
            <Controller
              name="estateAgent"
              control={control}
              render={({ field }) => (
                <Select
                  required
                  {...field}
                  displayEmpty
                  sx={selectStyles}
                  inputProps={{ sx: selectInputProps }}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    field.onChange(selectedValue);

                    // setFormFieldsData({
                    //   ...formFieldsData,
                    //   estateAgent: selectedValue || "", // Используйте пустую строку по умолчанию, если selectedValue равен null или undefined
                    // });
                  }}
                >
                  <MenuItem disabled value="">
                    Выберите агента
                  </MenuItem>
                  {isError && (
                    <MenuItem
                      disabled
                      value=""
                      sx={{ color: "customColors.colorsRed" }}
                    >
                      Произошла ошибка при загрузке данных, пожалуйста,
                      обратитесь в тех. поддержку
                    </MenuItem>
                  )}
                  {usersData &&
                    usersData.map((user) => (
                      <MenuItem key={user.username} value={user._id}>
                        {user.name}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
          )}
        </Box>
      </Box>
      <Box padding="0px 16px 12px 16px" display="flex" gap={2}>
        <CustomButton
          isCancelVariant
          size="medium"
          fullWidth
          onClick={handleFormReset}
          disabled={isLoading}
        >
          Сбросить
        </CustomButton>
        <CustomButton
          size="medium"
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          Применить
        </CustomButton>
      </Box>
    </Box>
  );
};
