import {
  Box,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import React from "react";
import {
  Controller,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import { CustomButton } from "../../../../components/CustomButton";
import { CustomInput } from "../../../../components/CustomInput";
import { FilterState, initialFilterState, useFilterStore } from "../../store";
import { useQueryClient } from "@tanstack/react-query";
import { apiCatalogModule } from "../../../CatalogModule/api/apiCatalogModule";

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

// todo: при выборе фильтров - обновляется урл страницы - если обновить страницу - урл остался прежним,
// а форма в фильтре обнулилась. Нужно либо очищать урл при обновлении страницы, либо обновлять фильтр
// в зависимости от урла
export const FilterForm = () => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState(false);
  const { filterState, setIsMobileFilterModalOpen, setFilterState } =
    useFilterStore((state) => state);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      ...filterState,
    },
  });

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
        queryKey: ["catalogItems"],
        queryFn: () => apiCatalogModule.fetchCatalog(queryParams),
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

  const updateUrlParams = (data: FieldValues) => {
    // Очищаем от пустых значений
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== ""),
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

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    updateUrlParams(data);
    setIsMobileFilterModalOpen(false);
  };

  const handleFormReset = () => {
    reset(initialFilterState);
    setFilterState(initialFilterState);
    setIsMobileFilterModalOpen(false);
    updateUrlParams(initialFilterState);
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
            Тип
          </Typography>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem value="sell">Купить</MenuItem>
                <MenuItem value="rent">Арендовать</MenuItem>
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
            Город
          </Typography>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: Караганда
                  </Typography>
                </MenuItem>
                <MenuItem value="krg">Караганда</MenuItem>
                <MenuItem value="ast">Астана</MenuItem>
                <MenuItem value="alm">Аламата</MenuItem>
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
            Категория
          </Typography>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: Квартира
                  </Typography>
                </MenuItem>
                <MenuItem value="apartment">Квартира</MenuItem>
                <MenuItem value="house">Дом</MenuItem>
                {/* <MenuItem value="cottage">Дача</MenuItem> */}
                <MenuItem value="land">Земельный участок</MenuItem>
                <MenuItem value="business">Коммерческая недвижимость</MenuItem>
                {/* <MenuItem value="factory">Заводы, фабрики</MenuItem> */}
                {/* <MenuItem value="other">Другое</MenuItem> */}
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
            Материал стен
          </Typography>
          <Controller
            name="houseWallMaterial"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: Кирпич
                  </Typography>
                </MenuItem>
                <MenuItem value="brick">Кирпич</MenuItem>
                <MenuItem value="wood">Дерево</MenuItem>
                <MenuItem value="gasSilicateBlock">
                  Газосиликатный блок
                </MenuItem>
                <MenuItem value="heatBlock">Теплоблок</MenuItem>
                <MenuItem value="panel">Каркасно-щитовой</MenuItem>
                <MenuItem value="monolith">Монолит</MenuItem>
                <MenuItem value="saman">Саман</MenuItem>
                <MenuItem value="gasConcreteBlock">Газобетонный блок</MenuItem>
                <MenuItem value="foamBlock">Пеноблок</MenuItem>
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
            Состояние
          </Typography>
          <Controller
            name="houseCondition"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Выбрать состояние"
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: Евроремонт
                  </Typography>
                </MenuItem>
                <MenuItem value="perfect">Евроремонт</MenuItem>
                <MenuItem value="good">Косметический ремонт</MenuItem>
                <MenuItem value="bad">Без ремонта</MenuItem>
                <MenuItem value="free">Свободная планировка</MenuItem>
                <MenuItem value="build">Черновая отделка</MenuItem>
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
            Количество комнат
          </Typography>
          <Controller
            name="roomCount"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={selectStyles}
                inputProps={{ sx: selectInputProps }}
              >
                <MenuItem disabled value="">
                  <Typography
                    variant="textCalloutRegular"
                    color="customColors.labelsSecondary"
                  >
                    Например: 1 ком.
                  </Typography>
                </MenuItem>
                <MenuItem value="1">1 ком.</MenuItem>
                <MenuItem value="2">2-х ком.</MenuItem>
                <MenuItem value="3">3-х ком.</MenuItem>
                <MenuItem value="4">4-х ком.</MenuItem>
                <MenuItem value="5">5 и более</MenuItem>
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
            Стоимость
          </Typography>
          <CustomInput
            id="priceStart"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="цена от"
            sx={{ marginBottom: 1.5 }}
          />
          <CustomInput
            id="priceEnd"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="цена до"
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            Площадь общая, от м²
          </Typography>
          <CustomInput
            id="houseSquare"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 42"
            sx={{ marginBottom: 1.5 }}
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            Площадь кухни, от м²
          </Typography>
          <CustomInput
            id="kitchenSquare"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 15"
            sx={{ marginBottom: 1.5 }}
          />
        </Box>
        <Box marginBottom={1.5}>
          <Typography
            component="p"
            color="customColors.labelsSecondary"
            variant="textFootnoteRegular"
            marginBottom={0.5}
          >
            Год постройки от
          </Typography>
          <CustomInput
            id="houseBuildingYear"
            register={register}
            errors={errors}
            disabled={isLoading}
            formatPrice={false}
            placeholder="Например: 2023"
            sx={{ marginBottom: 1.5 }}
          />
        </Box>
        <Box marginBottom={1.5}>
          <Controller
            name="mortgage"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
                label="Есть ипотека"
              />
            )}
          />
          <Controller
            name="hasSwap"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={field.value === "true"}
                    onChange={(e) =>
                      field.onChange(e.target.checked.toString())
                    }
                  />
                }
                label="Есть обмен"
              />
            )}
          />
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
