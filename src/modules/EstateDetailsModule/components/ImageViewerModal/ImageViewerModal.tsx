import React from "react";
import { Box, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/scss";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useScreenSize } from "../../../../hooks/useScreenSize";
import { useEstateDetailsStore } from "../../store/useEstateDetailsStore";
import { CustomButton } from "../../../../components/CustomButton";
import { MdDownload } from "react-icons/md";

export const ImageViewerModal = () => {
  const {
    isViewerModalOpen,
    activeImageIndex,
    setIsViewerModalOpen,
    estateDetails,
  } = useEstateDetailsStore((state) => state);
  const { isMobile } = useScreenSize();

  const images = estateDetails?.images;
  const initialSlide =
    images && images.findIndex((image) => image._id === activeImageIndex);

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

  // todo: сделать скачивание фото после обновления бекенда
  const handleClickImageDownloadButton = (imageUrl: string) => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.target = "_blank";
    const urlParts = imageUrl.split("/");
    link.download = urlParts[urlParts.length - 1] || "image.jpg"; // Извлекаем имя файла из URL или устанавливаем дефолтное имя
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // todo: пересмотреть отображение с реальными фото
  // todo: добавить кнопки пагинации в слайдер
  return (
    <SwipeableDrawer
      anchor={isMobile ? "bottom" : "top"}
      open={isViewerModalOpen}
      onClose={handleCloseViewer}
      onOpen={handleOpenViewer}
      PaperProps={{
        sx: {
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0, 1)",
          borderRadius: 0,
          margin: {
            sx: "none",
          },
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
                backgroundColor: "hsla(29, 100%, 50%, .75)",
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
            <IoClose color="hsla(32, 100%, 55%, 1)" />
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
            modules={isMobile ? [Pagination] : [Navigation, Pagination]}
            slidesPerView={1}
            spaceBetween={0}
            initialSlide={initialSlide || 0}
            speed={666}
            navigation={!isMobile}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
          >
            {images &&
              images.map((image, index) => (
                <SwiperSlide key={index} className="slide">
                  <Box
                    onClick={() =>
                      handleClickImageDownloadButton(image.imageUrl)
                    }
                    sx={{
                      position: "absolute",
                      right: "5%",
                      top: "5%",
                      background: "rgba(255,255,255, 0.75)",
                      borderRadius: 2,
                      cursor: "pointer",
                      transition: "all 333ms ease",
                      "&:hover": {
                        background: "#fff",
                      },
                    }}
                  >
                    <IconButton color="primary">
                      <MdDownload size={16} />
                    </IconButton>
                  </Box>
                  <Box
                    component="img"
                    src={image.imageUrl}
                    sx={{
                      width: 1, // занимает 100% ширины контейнера
                      height: { xs: "inherit", sm: "calc(100vh - 100px)" }, // автоматическая высота для сохранения пропорций
                      // maxHeight: "90vh",
                      maxWidth: "100%", // максимальная ширина ограничена шириной контейнера
                      objectFit: "contain", // сохраняет пропорции изображения
                    }}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Box>
      </Box>
      {isMobile && (
        <Box display="flex" padding="8px 0 16px 0">
          <CustomButton
            onClick={handleCloseViewer}
            fullWidth
            size="large"
            sx={{ margin: "0 16px" }}
          >
            Вернуться
          </CustomButton>
        </Box>
      )}
    </SwipeableDrawer>
  );
};
