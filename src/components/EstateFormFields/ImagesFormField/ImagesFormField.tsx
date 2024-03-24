import React, { ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { IoImagesOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";

import { ObjectImages } from "../../../shared/interfaces/EstateObjectTypes";

interface ImagesFormFieldProps {
  onImagesUpload: (files: FileList) => void;
  onImagesDelete: (fileName: string, clearAll?: boolean) => void;
  currentImages?: ObjectImages[];
  setExistingImages?: (v: ObjectImages[]) => void;
}

interface SelectedImage {
  img: string;
  _id: string;
  name?: string;
}

export const ImagesFormField = ({
  onImagesUpload,
  onImagesDelete,
  currentImages,
  setExistingImages,
}: ImagesFormFieldProps) => {
  const [selectedImages, setSelectedImages] = React.useState<SelectedImage[]>(
    [],
  );

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (currentImages && setExistingImages) {
      setExistingImages(currentImages); // При редактировании сетаем уже существующие фото

      // Приводим их к нужному виду для отображения превью в интерфейсе и сетаем в стейт
      const temp: SelectedImage[] = [];
      if (currentImages)
        currentImages.forEach((image) => {
          temp.push({ img: image.imageUrl, _id: image._id });
        });
      setSelectedImages(temp);
    }
  }, [currentImages, setExistingImages]);

  // Сетаем загруженные фото в стейт для превью и в стейт для реквеста
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files).map((file) => {
        return {
          img: URL.createObjectURL(file),
          _id: uuidv4(),
          name: file.name,
        };
      });

      setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
      onImagesUpload(e.target.files);
    }
  };

  React.useEffect(() => {
    // Очистка URL-ов для освобождения памяти при размонтировании компонента
    return () => {
      selectedImages.forEach(({ img }) => URL.revokeObjectURL(img));
    };
  }, [selectedImages]);

  const handleCustomInputClick = () => {
    fileInputRef.current?.click();
  };

  // Удаляем фото из стейта превью и из списка существующих фото, которое пойдет в реквест
  const handleClickDeleteButton = (
    imageToRemove: string,
    fileName: string | undefined,
  ) => {
    setSelectedImages((prev) =>
      prev.filter((image) => image._id !== imageToRemove),
    );
    // удалить фото из стейта реакт хука, если оно там есть,
    if (fileName) onImagesDelete(fileName);

    // Удаляем фото из списка существующих, если оно там есть
    if (currentImages && setExistingImages) {
      const updatedImages = currentImages.filter(
        (image) => image._id !== imageToRemove,
      );
      setExistingImages(updatedImages);
    }

    // todo: switch to react-dropzone
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClearImages = () => {
    setSelectedImages([]);
    onImagesDelete("", true); // При клике на "очистить все", также чистим и стейт реакт хук формы
    if (setExistingImages) setExistingImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
        <Alert severity="info" sx={{ marginBottom: 1 }}>
          Пожалуйста, загружайте только фотографии! Загрузка документов и других
          файлов{" "}
          <strong>приведет к ошибке! Загружайте не более 30 фотографий!</strong>
        </Alert>
        <Box
          ref={fileInputRef}
          data-id="input-files"
          component="input"
          type="file"
          accept="image/*"
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
                {selectedImages.map(({ _id, img, name }) => (
                  <SwiperSlide key={_id} className="slide">
                    <Box sx={{ position: "relative" }}>
                      <IconButton
                        onClick={() => handleClickDeleteButton(_id, name)}
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
                        src={img}
                        alt={img}
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
