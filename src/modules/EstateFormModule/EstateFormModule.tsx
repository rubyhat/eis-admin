import {
  Box,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { FieldValues, SubmitHandler, Controller } from "react-hook-form";
import { CustomButton } from "../../components/CustomButton";
import { CustomInput } from "../../components/CustomInput";
import {
  FormFieldsData,
  useCreateEstateStore,
} from "../CreateEstateModule/store";
import { useFormFields } from "./hooks/useFormFields";
import { BasicFormFields } from "./components/BasicFormFields";
import { selectInputProps, selectStyles } from "./assets/styles";

export const EstateFormModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData } = useCreateEstateStore((state) => state);
  const { control, register, handleSubmit, errors, updateFormFields } =
    useFormFields();

  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(false);
    updateFormFields(data as FormFieldsData);

    console.log(data);

    // estateAgent: {
    //   id: 1,
    //   name: "Артур Розе",
    //   avatar: "",
    //   phone: "",
    // },
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography>Добавить новый объект недвижимости</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <BasicFormFields isLoading={isLoading} />
          </Grid>
          <Grid item xs={12} md={3}>
            {(formFieldsData.category === "apartment" ||
              formFieldsData.category === "house") && (
              <>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
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
                    variant="textCalloutRegular"
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
                        <MenuItem value="gasConcreteBlock">
                          Газобетонный блок
                        </MenuItem>
                        <MenuItem value="cinderBlock">Шлакоблок</MenuItem>
                        <MenuItem value="heatBlock">Теплоблок</MenuItem>
                        <MenuItem value="foamBlock">Пеноблок</MenuItem>
                        <MenuItem value="panel">Каркасно-щитовой</MenuItem>
                        <MenuItem value="monolith">Монолит</MenuItem>
                        <MenuItem value="saman">Саман</MenuItem>
                      </Select>
                    )}
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Материал крыши
                  </Typography>
                  <Controller
                    name="houseRoofMaterial"
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
                            Например: Черепица
                          </Typography>
                        </MenuItem>
                        <MenuItem value="tile">Черепица</MenuItem>
                        <MenuItem value="soft">Мягкая кровля</MenuItem>
                        <MenuItem value="metal">Металл</MenuItem>
                        <MenuItem value="ondulin">Ондулин</MenuItem>
                        <MenuItem value="metalTile">Металлочерепица</MenuItem>
                        <MenuItem value="corrugatedSheetRoof">
                          Профлист
                        </MenuItem>
                        <MenuItem value="slate">Шифер</MenuItem>
                      </Select>
                    )}
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Мебель
                  </Typography>
                  <Controller
                    name="furniture"
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
                            Например: Без мебели
                          </Typography>
                        </MenuItem>
                        <MenuItem value="full">Полностью</MenuItem>
                        <MenuItem value="part">Частично</MenuItem>
                        <MenuItem value="none">Без мебели</MenuItem>
                      </Select>
                    )}
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Интернет
                  </Typography>
                  <Controller
                    name="ethernet"
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
                            Например: Подключен
                          </Typography>
                        </MenuItem>
                        <MenuItem value="connected">Подключен</MenuItem>
                        <MenuItem value="toConnect">Можно подключить</MenuItem>
                        <MenuItem value="none">Без интернета</MenuItem>
                      </Select>
                    )}
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Количество комнат
                  </Typography>
                  <CustomInput
                    id="roomCount"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    formatPrice={false}
                    placeholder="Например: 2"
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Год постройки
                  </Typography>
                  <CustomInput
                    id="houseBuildingYear"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    formatPrice={false}
                    placeholder="Например: 2023"
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Площадь, общая м2
                  </Typography>
                  <CustomInput
                    id="houseSquare"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    formatPrice={false}
                    placeholder="Например: 42"
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Площадь, кухня м2
                  </Typography>
                  <CustomInput
                    id="kitchenSquare"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    formatPrice={false}
                    placeholder="Например: 15"
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Количество этажей
                  </Typography>
                  <CustomInput
                    id="countFloor"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    formatPrice={false}
                    placeholder="Например: 2"
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Высота потолков
                  </Typography>
                  <CustomInput
                    id="ceilingHeight"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    formatPrice={false}
                    placeholder="Например: 2.5"
                  />
                </Box>
                <Box marginBottom={1.5}>
                  <Typography
                    component="p"
                    color="customColors.labelsSecondary"
                    variant="textCalloutRegular"
                    marginBottom={0.5}
                  >
                    Количество сан. узлов
                  </Typography>
                  <CustomInput
                    id="ceilingHeight"
                    register={register}
                    errors={errors}
                    disabled={isLoading}
                    formatPrice={false}
                    placeholder="Например: 2"
                  />
                </Box>
                {formFieldsData.category === "apartment" && (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        marginBottom: 1.5,
                      }}
                    >
                      <Box>
                        <Typography
                          component="p"
                          color="customColors.labelsSecondary"
                          variant="textCalloutRegular"
                          marginBottom={0.5}
                        >
                          Этаж
                        </Typography>
                        <CustomInput
                          id="targetFloor"
                          register={register}
                          errors={errors}
                          disabled={isLoading}
                          formatPrice={false}
                          placeholder="Например: 2"
                        />
                      </Box>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginTop={3}
                      >
                        /
                      </Typography>
                      <Box>
                        <Typography
                          component="p"
                          color="customColors.labelsSecondary"
                          variant="textCalloutRegular"
                          marginBottom={0.5}
                        >
                          Всего
                        </Typography>
                        <CustomInput
                          id="totalFloor"
                          register={register}
                          errors={errors}
                          disabled={isLoading}
                          formatPrice={false}
                          placeholder="Например: 5"
                        />
                      </Box>
                    </Box>
                  </>
                )}
                {formFieldsData.category === "house" && (
                  <>
                    <Box marginBottom={1.5}>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginBottom={0.5}
                      >
                        Тип дома
                      </Typography>
                      <Controller
                        name="houseType"
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
                                Например: Часть дома
                              </Typography>
                            </MenuItem>
                            <MenuItem value="part">Часть дома</MenuItem>
                            <MenuItem value="full">Целый дом</MenuItem>
                            <MenuItem value="other">Другое</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                    <Box marginBottom={1.5}>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginBottom={0.5}
                      >
                        Электричество
                      </Typography>
                      <Controller
                        name="electricType"
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
                                Например: Чаcтично
                              </Typography>
                            </MenuItem>
                            <MenuItem value="part">Частично</MenuItem>
                            <MenuItem value="full">Есть</MenuItem>
                            <MenuItem value="none">Нет</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                    <Box marginBottom={1.5}>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginBottom={0.5}
                      >
                        Отопление
                      </Typography>
                      <Controller
                        name="heatingType"
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
                                Например: Центральное
                              </Typography>
                            </MenuItem>
                            <MenuItem value="central">Центральное</MenuItem>
                            <MenuItem value="gas">Газовое</MenuItem>
                            <MenuItem value="solid">Твердое топливо</MenuItem>
                            <MenuItem value="liquid">Жидкое топливо</MenuItem>
                            <MenuItem value="none">Нет</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                    <Box marginBottom={1.5}>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginBottom={0.5}
                      >
                        Газ
                      </Typography>
                      <Controller
                        name="gasType"
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
                                Например: Центральное
                              </Typography>
                            </MenuItem>
                            <MenuItem value="central">Центральное</MenuItem>
                            <MenuItem value="auto">Автономное</MenuItem>
                            <MenuItem value="canConnect">
                              Можно подключить
                            </MenuItem>
                            <MenuItem value="none">Нет</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                    <Box marginBottom={1.5}>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginBottom={0.5}
                      >
                        Канализация
                      </Typography>
                      <Controller
                        name="sewerType"
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
                                Например: Центральная
                              </Typography>
                            </MenuItem>
                            <MenuItem value="central">Центральная</MenuItem>
                            <MenuItem value="septik">Септик</MenuItem>
                            <MenuItem value="canConnect">
                              Можно подключить
                            </MenuItem>
                            <MenuItem value="none">Нет</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                    <Box marginBottom={1.5}>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginBottom={0.5}
                      >
                        Туалет
                      </Typography>
                      <Controller
                        name="toiletType"
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
                                Например: Внутри
                              </Typography>
                            </MenuItem>
                            <MenuItem value="in">Внутри</MenuItem>
                            <MenuItem value="out">Снаружи</MenuItem>
                            <MenuItem value="none">Нет</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                    <Box marginBottom={1.5}>
                      <Typography
                        component="p"
                        color="customColors.labelsSecondary"
                        variant="textCalloutRegular"
                        marginBottom={0.5}
                      >
                        Канализация
                      </Typography>
                      <Controller
                        name="waterType"
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
                                Например: Центральная
                              </Typography>
                            </MenuItem>
                            <MenuItem value="central">Центральная</MenuItem>
                            <MenuItem value="borehole">Скважина</MenuItem>
                            <MenuItem value="canConnect">
                              Можно подключить
                            </MenuItem>
                            <MenuItem value="none">Нет</MenuItem>
                          </Select>
                        )}
                      />
                    </Box>
                  </>
                )}
              </>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <CustomButton type="submit">Добавить</CustomButton>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};
