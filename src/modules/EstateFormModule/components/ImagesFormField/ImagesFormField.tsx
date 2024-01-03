import React, { ChangeEvent } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { IoImagesOutline } from "react-icons/io5";
import { AiOutlineDelete } from "react-icons/ai";

interface ImagesFormFieldProps {
  onImagesUpload: (files: FileList) => void;
}

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

  //todo: remove before build
  React.useEffect(() => console.log(selectedImages), [selectedImages]);

  return (
    <Box>
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
          height: 150,
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
      {Boolean(selectedImages.length) && (
        <Box>
          <Typography
            component="h6"
            variant="titleThirdRegular"
            sx={{ padding: "16px 0 8px 0" }}
          >
            Выбрано фотографий: {selectedImages.length}
          </Typography>
          <Box>
            {selectedImages.map((image) => (
              <Box key={image} sx={{ position: "relative" }}>
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
                  sx={{ width: 1 }}
                  component="img"
                  src={image}
                  alt={image}
                />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};
