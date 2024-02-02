import { Box, Typography } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { Controller, useFormContext } from "react-hook-form";

interface RichTextEditorFieldProps {
  setDescriptionTempText: (v: string) => void;
}

export const RichTextEditorField = ({
  setDescriptionTempText,
}: RichTextEditorFieldProps) => {
  const { control } = useFormContext();

  return (
    <Box
      sx={{
        marginBottom: 1.5,
        "& .quill": {
          "& .ql-toolbar": {
            borderRadius: "8px 8px 0 0",
          },
          "& .ql-container, .ql-editor": {
            minHeight: 300,
            borderRadius: "0 0 8px 8px",
          },
        },
      }}
    >
      <Typography
        component="p"
        color="customColors.labelsSecondary"
        variant="textCalloutRegular"
        marginBottom={0.5}
      >
        Описание
      </Typography>
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactQuill
            theme="snow"
            value={value || ""}
            onChange={(e) => {
              onChange(e); // вызов обработчика из react-hooks-form
              setDescriptionTempText(e);
            }}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
    </Box>
  );
};
