import { Box } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";

export const RichTextEditorField = () => {
  const [value, setValue] = React.useState("");

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
      <ReactQuill theme="snow" value={value} onChange={setValue} />
    </Box>
  );
};
