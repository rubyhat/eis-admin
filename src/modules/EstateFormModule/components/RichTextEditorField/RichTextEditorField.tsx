import { Box } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { useFormFields } from "../../hooks/useFormFields";
import { Controller } from "react-hook-form";

export const RichTextEditorField = () => {
  const { control } = useFormFields();

  return (
    <Box
      sx={{
        marginBottom: 1.5,
        "& .quill": {
          "& .ql-toolbar": {
            borderRadius: "8px 8px 0 0",
          },
          "& .ql-container, .ql-editor": {
            minHeight: 200,
            borderRadius: "0 0 8px 8px",
          },
        },
      }}
    >
      <Controller
        name="description"
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <ReactQuill
            theme="snow"
            value={value || ""}
            onChange={onChange}
            onBlur={onBlur}
            ref={ref}
          />
        )}
      />
    </Box>
  );
};
