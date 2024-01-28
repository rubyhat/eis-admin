import React, { ChangeEvent } from "react";
import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { IoImagesOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

interface ImagesFormFieldProps {
  onImagesUpload: (files: FileList) => void;
}

// todo:  баг - добавили 2 фото - пролистнули на 2 фото и вернулись на 1, удалили 1 = баг со 2 фото
export const ImagesFormField = ({ onImagesUpload }: ImagesFormFieldProps) => {
  const [selectedImages, setSelectedImages] = React.useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      onImagesUpload(e.target.files);
    }
  };

  React.useEffect(() => {
    // Очистка URL-ов для освобождения памяти при размонтировании компонента
    return () => {
      selectedImages.forEach((fileURL) => URL.revokeObjectURL(fileURL));
    };
  }, [selectedImages]);

  const handleCustomInputClick = () => {
    fileInputRef.current?.click();
  };

  const handleClickDeleteButton = (imageToRemove: string) => {
    setSelectedImages((currentImages) =>
      currentImages.filter((image) => image !== imageToRemove),
    );
    // todo: switch to react-dropzone
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearImages = () => {
    setSelectedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  //todo: remove before build
  React.useEffect(() => console.log(selectedImages), [selectedImages]);

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography
          component="p"
          color="customColors.labelsSecondary"
          variant="textCalloutRegular"
          marginBottom={0.5}
        >
          Фотографии
        </Typography>
        <Box
          ref={fileInputRef}
          data-id="input-files"
          component="input"
          type="file"
          multiple
          onChange={handleImageChange}
          display="none"
        />
        <Box
          data-id="custom-input-files"
          onClick={handleCustomInputClick}
          sx={{
            w: 1,
            border: "1px solid",
            borderColor: "customColors.labelsQuaternary",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: 350,
            cursor: "pointer",
          }}
        >
          <Box textAlign="center">
            <IoImagesOutline size={32} color="hsla(211, 100%, 50%, 1)" />
            <Typography
              component="p"
              variant="textBodyRegular"
              color="customColors.labelsSecondary"
            >
              Выбрать фотографии
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography
          component="p"
          color="customColors.labelsSecondary"
          variant="textCalloutRegular"
          marginBottom={0.5}
        >
          Выбрано фотографий: {selectedImages.length}
        </Typography>
        {Boolean(!selectedImages.length) && (
          <Typography component="p" variant="textCalloutRegular">
            Добавьте фотографии, здесь можно будет их просмотреть
          </Typography>
        )}
        {Boolean(selectedImages.length) && (
          <Button
            size="small"
            color="error"
            variant="contained"
            sx={{ fontSize: 12, textTransform: "none", marginBottom: 2 }}
            onClick={handleClearImages}
          >
            Очистить все
          </Button>
        )}
        {Boolean(selectedImages.length) && (
          <Box>
            <Box>
              <Swiper slidesPerView={1.05} spaceBetween={8} speed={666}>
                {selectedImages.map((image, index) => (
                  <SwiperSlide key={index} className="slide">
                    <Box sx={{ position: "relative" }}>
                      <IconButton
                        onClick={() => handleClickDeleteButton(image)}
                        sx={{
                          position: "absolute",
                          right: 8,
                          top: 8,
                          backgroundColor: "rgba(255,255,255, 0.5)",
                        }}
                        color="error"
                      >
                        <AiOutlineDelete size={20} />
                      </IconButton>
                      <Box
                        sx={{
                          borderRadius: 3,
                          width: 1, // занимает 100% ширины контейнера
                          height: "350px", // автоматическая высота для сохранения пропорций
                          maxWidth: "100%", // максимальная ширина ограничена шириной контейнера
                          objectFit: "cover", // сохраняет пропорции изображения
                        }}
                        component="img"
                        src={image}
                        alt={image}
                      />
                    </Box>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Box>
          </Box>
        )}
      </Grid>
    </>
  );
};
