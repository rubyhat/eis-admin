import React from "react";
import {
  Box,
  FormControlLabel,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useFormFields } from "../../hooks/useFormFields";
import { Controller } from "react-hook-form";
import { selectInputProps, selectStyles } from "../../assets/styles";
import { CustomInput } from "../../../../components/CustomInput";

interface HouseFormFiledsProps {
  isLoading: boolean;
}

export const HouseFormFileds = ({ isLoading }: HouseFormFiledsProps) => {
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
              <MenuItem value="canConnect">Можно подключить</MenuItem>
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
              <MenuItem value="canConnect">Можно подключить</MenuItem>
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
              <MenuItem value="canConnect">Можно подключить</MenuItem>
              <MenuItem value="none">Нет</MenuItem>
            </Select>
          )}
        />
      </Box>
      <Box marginBottom={1.5}>
        <CustomInput
          id="plotSquare"
          register={register}
          errors={errors}
          disabled={isLoading}
          formatPrice={false}
          placeholder="Например: ул. Гоголя"
        />
      </Box>
      <Box marginBottom={1.5}>
        <Controller
          name="hasBasement"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={<Switch />}
              label="Есть цокольный этаж"
            />
          )}
        />
        <Controller
          name="hasMansard"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              {...field}
              control={<Switch />}
              label="Есть мансарда"
            />
          )}
        />
      </Box>
    </>
  );
};
