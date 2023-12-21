import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { FiShare } from "react-icons/fi";
import { useEstateDetailsStore } from "../../store/useEstateDetailsStore";
import { ImageViewerModal } from "../ImageViewerModal/ImageViewerModal";

export const ImagePreview = () => {
  const { activeImage, isViewerModalOpen, setIsViewerModalOpen } =
    useEstateDetailsStore((state) => state);
  const handleOpenViewer = () => setIsViewerModalOpen(true);
  const handleSharePage = () => {};
  return (
    <Box
      sx={{
        borderRadius: 2,
        boxShadow:
          "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",
      }}
    >
      {isViewerModalOpen && <ImageViewerModal />}
      <Box
        sx={{
          padding: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleOpenViewer}>
            <Box
              component="img"
              src="/static/images/icons/icon-resize.svg"
              alt="resize"
            />
          </IconButton>
          <Typography sx={{ color: "#4d4d4d" }} variant="textBodyEmphasized">
            Фотографии
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleSharePage}>
            <FiShare size={16} />
          </IconButton>
          <Box
            sx={{
              padding: "4px 8px",
              border: "1px solid",
              borderColor: "customColors.labelsQuaternary",
              borderRadius: 2,
              marginLeft: 1,
              cursor: "pointer",
              "&:hover": {
                span: {
                  color: "customColors.labelsPrimary",
                },
              },
            }}
            onClick={handleOpenViewer}
          >
            <Typography
              variant="captionFirstEmphasized"
              color="customColors.labelsSecondary"
              sx={{ transition: "all 333ms ease" }}
            >
              Превью
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box padding="0 4px">
        <Box
          onClick={handleOpenViewer}
          component="img"
          src={activeImage}
          alt="Фото объекта"
          sx={{
            // todo: turn on with real images
            // border: "1px solid",
            // borderColor: "customColors.labelsSecondary",
            cursor: "pointer",
            borderRadius: 1.5,
            width: "100%",
          }}
        />
      </Box>
    </Box>
  );
};
