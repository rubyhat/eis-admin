import { Box, Typography } from "@mui/material";
import React from "react";

export const AgentCard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        maxWidth: {
          sx: 1,
          sm: "343px",
        },
        padding: 2,
        borderRadius: 4,
        boxShadow:
          "0px 0px 0px 0.5px rgba(0, 0, 0, 0.05), 0px 0.5px 2.5px 0px rgba(0, 0, 0, 0.30)",
      }}
    >
      <Box>
        <Box
          component="img"
          src="/static/images/temp-agent-avatar.webp"
          alt="Риэлтор"
          width="60px"
          borderRadius={2}
        />
      </Box>
      <Box>
        <Typography
          component="h6"
          variant="textBodyEmphasized"
          color="customColors.colorsBlue"
          width={1}
          display="flex"
          justifyContent="space-between"
        >
          Артур Розе
          <Typography
            variant="captionFirstRegular"
            color="customColors.labelsSecondary"
          >
            5.0
          </Typography>
        </Typography>
        <Typography variant="textSubheadlineRegular">
          Агент по недвижимости сопровождающий данный объект
        </Typography>
      </Box>
    </Box>
  );
};
