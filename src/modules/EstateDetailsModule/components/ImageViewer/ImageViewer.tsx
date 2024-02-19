import { Box } from "@mui/material";
import React from "react";
import { ImagePreview } from "../ImagePreview/ImagePreview";
import { ImageThumbs } from "../ImageThumbs/ImageThumbs";

export const ImageViewer = () => {
  return (
    <Box>
      <ImagePreview />
      <Box marginTop={1.5}>
        <ImageThumbs />
      </Box>
    </Box>
  );
};
