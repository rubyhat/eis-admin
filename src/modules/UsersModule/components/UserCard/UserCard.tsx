import React from "react";
import { Box } from "@mui/system";
import { Chip, List, ListItem, ListItemText, Typography } from "@mui/material";
import { EstateAgentInfo } from "../../../../shared/interfaces/EstateObjectTypes";

interface UserCardProps {
  user: EstateAgentInfo;
}

export const UserCard = ({ user }: UserCardProps) => {
  return (
    <Box
      sx={{
        padding: 1,
        border: "1px solid",
        borderColor: "customColors.labelsQuaternary",
        borderRadius: 2,
      }}
    >
      <List dense>
        <ListItem>
          <Typography component="h6" variant="titleSecondEmphasized">
            {user.name} <Chip label={user.role} color="primary" size="small" />
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary={user.username} secondary="Никнейм" />
        </ListItem>
        {user.phone && (
          <ListItem>
            <ListItemText primary={user.phone} secondary="Номер телефона" />
          </ListItem>
        )}
        {user.email && (
          <ListItem>
            <ListItemText primary={user.email} secondary="Адрес почты" />
          </ListItem>
        )}
      </List>
    </Box>
  );
};
