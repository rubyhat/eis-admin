import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface LoadingSplashScreenProps {
  isLoading: boolean;
  text?: string;
}

export const LoadingSplashScreen = ({
  isLoading,
  text = "Загрузка... Пожалуйста, подождите",
}: LoadingSplashScreenProps) => {
  React.useEffect(() => {
    isLoading
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "inherit");
  }, [isLoading]);

  return (
    <Box
      sx={{
        width: 1,
        height: "100%",
        position: "fixed",
        zIndex: 2,
        left: 0,
        top: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 123, 255, .15)",
        display: isLoading ? "flex" : "none",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
        <Typography
          sx={{
            fontWeight: 700,
            background: "rgba(0, 123, 255, .75)",
            color: "white",
            padding: 1,
            borderRadius: 2,
            marginTop: 4,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};
