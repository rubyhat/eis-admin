import React, { ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import { IoImagesOutline } from "react-icons/io5";

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

      // Очистка URL-ов для освобождения памяти
      filesArray.forEach((fileURL) => URL.revokeObjectURL(fileURL));
    }
  };

  const handleCustomInputClick = () => {
    fileInputRef.current?.click();
  };

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
          <IoImagesOutline size={24} color="hsla(211, 100%, 50%, 1)" />
          <Typography
            component="p"
            variant="textBodyRegular"
            color="customColors.labelsSecondary"
          >
            Выбрать фотографии
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
