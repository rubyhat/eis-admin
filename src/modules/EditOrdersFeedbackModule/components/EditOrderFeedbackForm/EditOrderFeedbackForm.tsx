import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { Box, MenuItem, Select, Typography } from "@mui/material";
import { FeedbackOrder } from "../../../FeedbackOrdersModule/store";
import { CustomInput } from "../../../../components/CustomInput";
import { CustomButton } from "../../../../components/CustomButton";
import { useQuery } from "@tanstack/react-query";
import { FetchAllUsers } from "../../../../shared/api/apiFetchAllUsers";

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

interface EditOrderFeedbackFormProps {
  order: FeedbackOrder;
}

export const EditOrderFeedbackForm = ({
  order,
}: EditOrderFeedbackFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      phone: order?.phone || "",
      estateId: order?.estateId,
      estateAgent: order?.estateAgent,
      description: order?.description,
      title: order?.title,
    },
  });

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError,
  } = useQuery({
    queryFn: () => FetchAllUsers(),
    queryKey: ["usersItems"],
  });

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{
        width: 1,
        borderRadius: 2,
        boxShadow:
          "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",
        height: "fit-content",
      }}
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
            disabled={isLoading}
            {...register("description")}
            sx={{
              width: 1,
              minHeight: 150,
              border: `1px solid`,
              borderColor: "customColors.labelsQuaternary",
              borderRadius: "5px",
              fontSize: 16,
              padding: 1,
              outlineColor: "customColors.colorsOrange",
              "&::placeholder": {
                fontSize: 14,
                color: "customColors.labelsTertiary",
              },
            }}
          />
        </Box>
      </Box>
      <Box padding="0px 16px 12px 16px" display="flex" gap={2}>
        <CustomButton
          size="medium"
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          Сохранить
        </CustomButton>
      </Box>
    </Box>
  );
};
