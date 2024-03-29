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
        backgroundColor: "hsla(29, 100%, 50%, .15)",
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
            background: "hsla(29, 100%, 50%, .75)",
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
