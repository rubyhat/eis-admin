import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, MenuItem, Select, Typography } from "@mui/material";

import { CustomInput } from "../../../../components/CustomInput";
import { apiFetchAllUsers } from "../../../../shared/api/apiFetchAllUsers";
import { CustomButton } from "../../../../components/CustomButton";
import {
  FilterState,
  initialFilterState,
  useFeedbackOrdersStore,
} from "../../store";
import { apiFeedbackOrdersModule } from "../../api";
import { selectInputProps, selectStyles } from "../../../../shared/styles";

// todo: add params in url, when form was used, add request, when backend will be ready
export const FeedbackOrderFilterForm = () => {
  const queryClient = useQueryClient();

  const { filterState, setFilterState, setIsMobileFilterModalOpen } =
    useFeedbackOrdersStore((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: filterState,
  });

  // todo: вынести в кастом хуки
  React.useEffect(() => {
    reset(initialFilterState); // Сбрасываем форму к исходным значениям
    setFilterState(initialFilterState); // Сбрасываем стейт фильтра к исходному состоянию
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, reset, setFilterState]);

  React.useEffect(() => {
    const updateFilterState = async () => {
      // Получаем параметры из URL
      const searchParams = new URLSearchParams(location.search);

      // Преобразуем их в объект
      const params = Object.fromEntries(searchParams.entries());
      const newFilterValues = { ...initialFilterState, ...params };
      setFilterState(newFilterValues); // обновляем стейт в стейт менеджере
      reset(newFilterValues); // обновляем стейт в react-hook-form
    };

    // Проверяем, есть ли параметры в URL
    if (location.search) {
      updateFilterState();
    }
  }, [setFilterState, reset, queryClient]);

  const fetchData = async (queryParams: string = "") => {
    setIsLoading(true);
    try {
      await queryClient.fetchQuery({
        queryKey: ["feedbackOrders"],
        queryFn: () => apiFeedbackOrdersModule.fetchFeedbacks(queryParams),
      });
      toast.success("Фльтры успешно обновлены!");
    } catch (error) {
      toast.error("Извините, произошла ошибка, попробуйте повторить позднее.");
      // eslint-disable-next-line no-console
      console.error("fetch data error", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // todo: вынести в utils
  const updateUrlParams = (data: FieldValues) => {
    // Очищаем от пустых значений
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([, value]) => value !== "" && value !== null,
      ),
    );

    // Сохраняем стейт фильтра
    setFilterState({ ...data } as FilterState);

    // Создаем параметры для ссылки
    const queryParams = new URLSearchParams(filteredData).toString();

    // Получение текущего URL
    const currentUrl = new URL(window.location.href);

    // Добавляем параметры запроса к текущему URL
    currentUrl.search = queryParams;

    // Обновляем URL без перезагрузки страницы
    window.history.pushState({}, "", currentUrl);

    // Делаем запрос за данными на сервер
    fetchData(queryParams);
  };

  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError,
  } = useQuery({
    queryFn: () => apiFetchAllUsers.fetchAllUsers(),
    queryKey: ["usersItems"],
  });

  const navigate = useNavigate();

  const handleFormReset = () => {
    reset(initialFilterState);
    setIsMobileFilterModalOpen(false);
    navigate(""); // Очищаем урл параметры
    setFilterState(initialFilterState);
    fetchData(""); // Делаем новый запрос без параметров
  };

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    updateUrlParams(data);
    setIsMobileFilterModalOpen(false);
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
            Имя
          </Typography>
          <CustomInput
            id="name"
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
                <MenuItem disabled value="">
                  Выберите статус
                </MenuItem>
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
