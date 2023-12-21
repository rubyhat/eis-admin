import { Box } from "@mui/material";
import React from "react";
import { useEstateDetailsStore } from "../../store/useEstateDetailsStore";

interface ImageThumbsItemProps {
  thumb: string;
}
export const ImageThumbsItem = ({ thumb }: ImageThumbsItemProps) => {
  const { activeImage } = useEstateDetailsStore((state) => state);
  const activeThumbStyles = thumb === activeImage && {
    border: "2px solid",
    borderColor: "customColors.colorsBlue",
  };
  return (
    <Box
      component="img"
      src={thumb}
      alt="Фото Объекта"
      sx={{
        width: 1,
        maxWidth: "64px",
        height: "64px",
        cursor: "pointer",
        borderRadius: 2,
        ...activeThumbStyles,
      }}
    />
  );
};
