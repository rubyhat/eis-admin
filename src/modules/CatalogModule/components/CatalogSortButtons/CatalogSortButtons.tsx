import { Box, Typography } from "@mui/material";
import React from "react";
import {
  VisibilityStatusType,
  useCatalogStore,
} from "../../store/useCatalogStore";

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
  const { activeSortType, setActiveSortType } = useCatalogStore(
    (state) => state,
  );

  const handleButtonClick = (type: VisibilityStatusType) => {
    setActiveSortType(type);
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
