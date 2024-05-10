import React from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { TbCurrencyTenge } from "react-icons/tb";

import { CustomInput } from "../../../../components/CustomInput";
import { CustomButton } from "../../../../components/CustomButton";

import { apiDrawerSoldEstate } from "../../api/apiDrawerSoldEstate";
import { DisplayEstateObject } from "../../../../shared/interfaces/EstateObjectTypes";
import { useEstateDetailsStore } from "../../../EstateDetailsModule/store";
import { useDrawerSoldEstateStore } from "../../store/useDrawerSoldEstateStore";
import { useQueryClient } from "@tanstack/react-query";
import { apiEstateDetailsModule } from "../../../EstateDetailsModule/api/apiEstateDetailsModule";

export const DrawerSoldForm = () => {
  const { setIsDrawerOpen } = useDrawerSoldEstateStore();
  const { setCurrentVisibilityStatus, estateDetails } = useEstateDetailsStore();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, setValue } = useForm<FieldValues>({
    defaultValues: {
      soldPrice: estateDetails?.soldPrice || null,
    },
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const handleFormSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    const clearData: Partial<DisplayEstateObject> = {
      soldPrice: Number(data.soldPrice),
      visibilityStatus: "sold",
    };

    if (id) {
      apiDrawerSoldEstate
        .editObject(id, clearData)
        .then((response) => {
          if (response) {
            toast.success("Объект успешно обновлен!");
            setCurrentVisibilityStatus("sold");
            // todo: мы берем данные из useLocation на странице estateDetails, поэтому этот метод не совсем подходит. Нужно будет поизучать этот момент
            // queryClient.invalidateQueries({ queryKey: ["estateDetails"] });
            queryClient.fetchQuery({
              queryKey: ["estateDetails", id],
              queryFn: () => apiEstateDetailsModule.getDetailsById(id),
            });
          }
        })
        .catch(() => {
          toast.error(
            "Произошла ошибка! Пожалуйста, обратитьесь в тех. поддержку",
          );
        })
        .finally(() => setIsLoading(false));
    } else {
      toast.error("Произошла ошибка! Пожалуйста, обратитьесь в тех. поддержку");
    }
    setIsDrawerOpen(false);
  };

  const price = (estateDetails && estateDetails.price) || 0;
  const discount = (estateDetails && estateDetails.discount) || 0;
  const currentPrice = price - discount;

  const handleCurrentPriceClick = () => setValue("soldPrice", currentPrice);

  return (
    <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      {estateDetails && (
        <Box paddingBottom={1.5} onClick={handleCurrentPriceClick}>
          <Typography
            component="p"
            variant="textBodyRegular"
            sx={{ display: "flex" }}
          >
            Текущая стоимость:
            <Typography
              component="span"
              sx={{
                color: "customColors.colorsOrange",
                textDecoration: "underline",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                marginLeft: 1,
              }}
            >
              {currentPrice} <TbCurrencyTenge />
            </Typography>
          </Typography>
        </Box>
      )}
      <Box marginBottom={1.5}>
        <Typography
          component="p"
          color="customColors.labelsSecondary"
          variant="textCalloutRegular"
          marginBottom={0.5}
        >
          Сумма продажи
          <Typography
            component="span"
            color="customColors.colorsRed"
            variant="textCalloutRegular"
            marginLeft={0.5}
          >
            *
          </Typography>
        </Typography>
        <CustomInput
          required
          id="soldPrice"
          register={register}
          errors={formState.errors}
          disabled={isLoading}
          formatPrice={false}
          placeholder="Например: 42 000 000"
          type="number"
          min="0"
        />
      </Box>
      <Box>
        <CustomButton fullWidth type="submit">
          Сохранить
        </CustomButton>
      </Box>
    </Box>
  );
};
