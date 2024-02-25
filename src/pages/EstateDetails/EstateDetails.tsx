import { Box } from "@mui/material";
import React from "react";
import { EstateDetailsModule } from "../../modules/EstateDetailsModule";

export const EstateDetails = () => {
  React.useEffect(() => window.scroll(0, 0), []);
  return (
    <Box className={"section"}>
      <EstateDetailsModule />
    </Box>
  );
};
