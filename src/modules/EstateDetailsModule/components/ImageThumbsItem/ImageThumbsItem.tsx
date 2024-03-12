import React from "react";
import { Box, CircularProgress } from "@mui/material";

import { useEstateDetailsStore } from "../../store/useEstateDetailsStore";

interface ImageThumbsItemProps {
  thumb: string;
  _id: string;
}
export const ImageThumbsItem = ({ thumb, _id }: ImageThumbsItemProps) => {
  const { activeImageIndex } = useEstateDetailsStore((state) => state);
  const [imgLoading, setImgLoading] = React.useState(true);

  const activeThumbStyles = _id === activeImageIndex && {
    border: "2px solid",
    borderColor: "customColors.colorsOrange",
  };

  const handleImageLoad = () => setImgLoading(false);

  return (
    <>
      <Box
        sx={{
          display: imgLoading ? "flex" : "none",
          width: 64,
          height: 64,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
      <Box
        component="img"
        src={thumb}
        alt="Фото Объекта"
        onLoad={handleImageLoad}
        sx={{
          display: imgLoading ? "none" : "inherit",
          width: "64px",
          height: "64px",
          cursor: "pointer",
          borderRadius: 2,
          objectFit: "cover",
          ...activeThumbStyles,
        }}
      />
    </>
  );
};
