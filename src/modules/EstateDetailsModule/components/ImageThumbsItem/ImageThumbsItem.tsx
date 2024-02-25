import { Box } from "@mui/material";
import React from "react";
import { useEstateDetailsStore } from "../../store/useEstateDetailsStore";

interface ImageThumbsItemProps {
  thumb: string;
  _id: string;
}
export const ImageThumbsItem = ({ thumb, _id }: ImageThumbsItemProps) => {
  const { activeImageIndex } = useEstateDetailsStore((state) => state);
  const activeThumbStyles = _id === activeImageIndex && {
    border: "2px solid",
    borderColor: "customColors.colorsBlue",
  };
  return (
    <Box
      component="img"
      src={thumb}
      alt="Фото Объекта"
      sx={{
        width: "64px",
        height: "64px",
        cursor: "pointer",
        borderRadius: 2,
        objectFit: "cover",
        ...activeThumbStyles,
      }}
    />
  );
};
