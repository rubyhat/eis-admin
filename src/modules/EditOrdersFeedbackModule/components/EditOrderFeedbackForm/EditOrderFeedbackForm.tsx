import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Box, MenuItem, Select, Typography } from "@mui/material";

import {
  FeedbackOrder,
  FeedbackOrderDisplay,
} from "../../../FeedbackOrdersModule/store";
import { CustomInput } from "../../../../components/CustomInput";
import { CustomButton } from "../../../../components/CustomButton";
import { apiFetchAllUsers } from "../../../../shared/api";
import { formStyles, textareaStyles } from "./styles";
import { useUpdateFeedbackMutation } from "../../hooks";
import { selectInputProps, selectStyles } from "../../../../shared/styles";

interface EditOrderFeedbackFormProps {
  order: FeedbackOrderDisplay;
}

export const EditOrderFeedbackForm = ({
  order,
}: EditOrderFeedbackFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      _id: order._id,
      phone: order.phone,
      name: order.name,
      estateId: order.estateId || "",
      estateAgent: order.estateAgent?._id || "",
      description: order.description || "",
      title: order.title || "",
      status: order.status,
    },
  });

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError,
  } = useQuery({
    queryFn: () => apiFetchAllUsers.fetchAllUsers(),
    queryKey: ["usersItems"],
  });

  React.useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    const user = userFromStorage ? JSON.parse(userFromStorage) : null;

    if (usersData) {
      setValue("estateAgent", user.id);
    }
  }, [setValue, usersData]);

  const updateFeedbackMutation = useUpdateFeedbackMutation();

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    const feedback: FeedbackOrder = {
      ...order,
      ...data,
      estateAgent: data.estateAgent,
    };

    const filteredData = Object.fromEntries(
      Object.entries(feedback).filter(
        ([, value]) => value !== "" && value !== null,
      ),
    );

    updateFeedbackMutation.mutate(filteredData as FeedbackOrder);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={formStyles}
    >
      <Box padding="12px 16px">
        <Typography component="h6" variant="titleSecondRegular">
          Редактирование заявки
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
            disabled
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
            Имя клиента
          </Typography>
          <CustomInput
            id="name"
            register={register}
            errors={errors}
            disabled
            formatPrice={false}
            placeholder="Введите имя клиента"
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
            disabled
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
            Статус
          </Typography>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  field.onChange(selectedValue);
                }}
              >
                <MenuItem value="new">Новая</MenuItem>
                <MenuItem value="inWork">В работе</MenuItem>
                <MenuItem value="completed">Завершена</MenuItem>
              </Select>
            )}
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            Сотрудник
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
                  }}
                >
                  <MenuItem disabled value="">
                    Выберите сотрудника
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
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            Заметка для сотрудников
          </Typography>
          <Box
            id="description"
            component="textarea"
            placeholder="Эту заметку будут видеть только сотрудники..."
            disabled={updateFeedbackMutation.isPending}
            {...register("description")}
            sx={textareaStyles}
          />
        </Box>
      </Box>
      <Box padding="0px 16px 12px 16px" display="flex" gap={2}>
        <CustomButton
          size="medium"
          fullWidth
          type="submit"
          disabled={updateFeedbackMutation.isPending}
        >
          {updateFeedbackMutation.isPending ? "Загрузка..." : "Сохранить"}
        </CustomButton>
      </Box>
    </Box>
  );
};
