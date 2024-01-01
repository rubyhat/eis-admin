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
import {
  FormFieldsData,
  useCreateEstateStore,
} from "../CreateEstateModule/store";
import { useFormFields } from "./hooks/useFormFields";
import { BasicFormFields } from "./components/BasicFormFields";
import { selectInputProps, selectStyles } from "./assets/styles";
import { HomeFormFields } from "./components/HomeFormFields";
import { ApartmentFormFields } from "./components/ApartmentFormFields";

export const EstateFormModule = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { formFieldsData } = useCreateEstateStore((state) => state);
  const { control, handleSubmit, updateFormFields } = useFormFields();

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
                <HomeFormFields isLoading={isLoading} />
                {formFieldsData.category === "apartment" && (
                  <ApartmentFormFields isLoading={isLoading} />
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
