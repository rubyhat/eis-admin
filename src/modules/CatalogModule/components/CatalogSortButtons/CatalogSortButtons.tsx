import { Box, Typography } from "@mui/material";
import React from "react";
import { useCatalogStore } from "../../store/useCatalogStore";
import { VisibilityStatusType } from "../../../../shared/interfaces/EstateObjectTypes";

const sortWrapperStyles = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: 0.25,
  borderRadius: 2,
  backgroundColor: "rgba(118, 118, 128, 0.12)",
};

const sortButtonStyles = {
  textAlign: "center",
  minWidth: "80px",
  width: "100%",
  padding: "6px 8px",
  borderRadius: "7px",
  border: "none",
  cursor: "pointer",
  background: "transparent",
};

const sortButtonActiveStyles = {
  backgroundColor: "customColors.colorsWhite",
  boxShadow:
    "0px 3px 1px 0px rgba(0, 0, 0, 0.04), 0px 3px 8px 0px rgba(0, 0, 0, 0.12)",
};

const separatorStyles = {
  width: "1px",
  height: 16,
  backgroundColor: "rgba(60, 60, 67, 0.36)",
  borderRadius: 1,
};

const sortOptions = [
  { type: "active", label: "Активные" },
  { type: "checking", label: "На проверке" },
  { type: "sold", label: "Проданные" },
  { type: "canceled", label: "Отмененные" },
];

export const CatalogSortButtons = () => {
  const { activeSortType, estateObjects, setActiveSortType, setEstateObjects } =
    useCatalogStore((state) => state);

  // todo: нужно ли мутировать исходный estateObjects?
  const handleButtonClick = (type: VisibilityStatusType) => {
    setActiveSortType(type);
    const filteredData = estateObjects.slice().sort((a, b) => {
      if (a.visibilityStatus === type && b.visibilityStatus !== type) {
        // Если статус a соответствует выбранному, но статус b - нет,
        // a должен идти перед b, возвращаем -1
        return -1;
      } else if (a.visibilityStatus !== type && b.visibilityStatus === type) {
        // Если статус b соответствует выбранному, но статус a - нет,
        // b должен идти перед a, возвращаем 1
        return 1;
      }
      // Если статусы обоих объектов одинаково соответствуют или не соответствуют
      // выбранному статусу, порядок остается неизменным
      return 0;
    });
    setEstateObjects(filteredData);
  };

  // todo: сделать гибко, сейчас hardcode на четыре кнопки, если кнопок будет больше, то уже не будет работать
  const shouldShowSeparator = (index: number, side: "start" | "end") => {
    return (
      (activeSortType === "active" && index === 1 && side === "end") ||
      (activeSortType === "active" && index === 2 && side === "end") ||
      (activeSortType === "checking" && index === 2 && side === "end") ||
      (activeSortType === "sold" && index === 1 && side === "start") ||
      (activeSortType === "canceled" && index === 0 && side === "end") ||
      (activeSortType === "canceled" && index === 2 && side === "start")
    );
  };

  return (
    <Box
      sx={{
        ...sortWrapperStyles,
        minWidth: {
          xs: "480px",
          sm: "inherit",
        },
        overflowX: {
          xs: "scroll",
          sm: "hidden",
        },
      }}
    >
      {sortOptions.map(({ type, label }, index) => (
        <React.Fragment key={index}>
          {shouldShowSeparator(index, "start") && (
            <Box component="div" sx={separatorStyles} />
          )}
          <Box
            component="button"
            onClick={() => handleButtonClick(type as VisibilityStatusType)}
            sx={
              activeSortType === type
                ? { ...sortButtonStyles, ...sortButtonActiveStyles }
                : { ...sortButtonStyles }
            }
          >
            <Typography
              component="p"
              variant="textFootnoteRegular"
              color="customColors.labelsPrimary"
            >
              {label}
            </Typography>
          </Box>
          {shouldShowSeparator(index, "end") && (
            <Box component="div" sx={separatorStyles} />
          )}
        </React.Fragment>
      ))}
    </Box>
  );
};
