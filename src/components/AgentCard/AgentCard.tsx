import { Box, Typography } from "@mui/material";
import React from "react";
import { EstateAgentInfo } from "../../shared/interfaces/EstateObjectTypes";
import { AiFillStar } from "react-icons/ai";

interface AgentCardProps {
  estateAgent: EstateAgentInfo;
}

export const AgentCard = ({ estateAgent }: AgentCardProps) => {
  const { name, avatar } = estateAgent;
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
          src={avatar ? avatar : "/static/images/temp-agent-avatar.webp"}
          alt="Риэлтор"
          sx={{
            borderRadius: 2,
            objectFit: "cover",
            width: "60px",
            height: "60px",
          }}
        />
      </Box>
      <Box>
        <Typography
          component="h6"
          variant="textBodyEmphasized"
          color="customColors.colorsOrange"
          width={1}
          display="flex"
          justifyContent="space-between"
        >
          {name}
          <Typography
            variant="captionFirstRegular"
            color="customColors.labelsSecondary"
            display="flex"
            alignItems="center"
          >
            <AiFillStar color="#ffcc00" />
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
