import { Box } from "@mui/material";
import React from "react";
import { ImageThumbsItem } from "../ImageThumbsItem/ImageThumbsItem";
import { useEstateDetailsStore } from "../../store/useEstateDetailsStore";

export const ImageThumbs = () => {
  const { estateDetails, setActiveImage } = useEstateDetailsStore(
    (state) => state,
  );

  const handleClickThumb = (img: string, index: string) =>
    setActiveImage(img, index);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        // todo: add scroll to mobile ?
        // maxWidth: "100%",
        // overflow: "hidden",
        // overflowX: "scroll",
        gap: 1,
      }}
    >
      {estateDetails &&
        estateDetails.images &&
        estateDetails.images.map(({ thumbnailUrl, _id }) => (
          <Box key={_id} onClick={() => handleClickThumb(thumbnailUrl, _id)}>
            <ImageThumbsItem thumb={thumbnailUrl} _id={_id} />
          </Box>
        ))}
    </Box>
  );
};
