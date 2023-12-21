import React from "react";
import { Box, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";

import { useScreenSize } from "../../../../hooks/useScreenSize";
import { useEstateDetailsStore } from "../../store/useEstateDetailsStore";
import { CustomButton } from "../../../../components/CustomButton";

import "swiper/scss";
import { IoClose } from "react-icons/io5";

export const ImageViewerModal = () => {
  const { isViewerModalOpen, activeImageIndex, images, setIsViewerModalOpen } =
    useEstateDetailsStore((state) => state);
  const { isMobile } = useScreenSize();

  const handleCloseViewer = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsViewerModalOpen(false);
  };

  const handleOpenViewer = () => setIsViewerModalOpen(true);

  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "top"}
      open={isViewerModalOpen}
      onClose={handleCloseViewer}
      onOpen={handleOpenViewer}
      PaperProps={{
        sx: {
          width: "100%",
          maxWidth: "1236px",
          borderRadius: isMobile ? "8px 8px 0 0" : 4,
          margin: {
            sx: "none",
            sm: "10% auto",
          },
          // height: "min-content",
        },
      }}
    >
      {isMobile ? (
        <Box display="flex" justifyContent="center">
          <Box
            sx={{ padding: "12px 0 4px 0", width: "20%", cursor: "pointer" }}
            onClick={handleCloseViewer}
          >
            <Box
              sx={{
                width: "100%",
                height: 4,
                borderRadius: 4,
                backgroundColor: "customColors.labelsQuaternary",
              }}
            ></Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 2,
          }}
        >
          <Typography component="h3" variant="titleFirstRegular">
            Просмотр фотографий
          </Typography>
          <IconButton onClick={handleCloseViewer}>
            <IoClose />
          </IconButton>
        </Box>
      )}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box
          className="estate-details__swiper-wrapper"
          sx={{
            padding: {
              xs: "8px 0",
              sm: 1,
            },
          }}
        >
          <Swiper
            slidesPerView={1.1}
            spaceBetween={8}
            initialSlide={activeImageIndex}
            speed={666}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="slide">
                <Box
                  component="img"
                  src={image}
                  sx={{
                    borderRadius: 3,
                    width: 1, // занимает 100% ширины контейнера
                    height: "auto", // автоматическая высота для сохранения пропорций
                    maxWidth: "100%", // максимальная ширина ограничена шириной контейнера
                    objectFit: "contain", // сохраняет пропорции изображения
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        {isMobile && (
          <Box display="flex" padding="8px 0 16px 0">
            <CustomButton
              onClick={handleCloseViewer}
              fullWidth
              size="large"
              sx={{ margin: "0 16px" }}
            >
              Закрыть
            </CustomButton>
          </Box>
        )}
      </Box>
    </SwipeableDrawer>
  );
};
