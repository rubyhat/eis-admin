import React from "react";
import { Box, Typography } from "@mui/material";
import { AiFillStar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

import { EstateAgentInfo } from "../../shared/interfaces/EstateObjectTypes";
import { cardWrapperStyles, imageStyles } from "./styles";

interface AgentCardProps {
  estateAgent: EstateAgentInfo;
}

export const AgentCard = ({ estateAgent }: AgentCardProps) => {
  const { name, avatar } = estateAgent;
  return (
    <Box sx={cardWrapperStyles}>
      <Box>
        {avatar ? (
          <Box component="img" src={avatar} alt="Риэлтор" sx={imageStyles} />
        ) : (
          <CgProfile size={48} color="#aaa" />
        )}
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
