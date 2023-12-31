import { Box, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { selectInputProps, selectStyles } from "../../assets/styles";
import { CustomInput } from "../../../../components/CustomInput";
import { useFormFields } from "../../hooks/useFormFields";

interface HomeFormFieldsProps {
  isLoading: boolean;
}

export const HomeFormFields = ({ isLoading }: HomeFormFieldsProps) => {
  const { control, register, errors } = useFormFields();
  return (
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
              <MenuItem value="gasSilicateBlock">Газосиликатный блок</MenuItem>
              <MenuItem value="gasConcreteBlock">Газобетонный блок</MenuItem>
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
              <MenuItem value="corrugatedSheetRoof">Профлист</MenuItem>
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
    </>
  );
};
