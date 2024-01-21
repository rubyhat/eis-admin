import React from "react";
import { User } from "../../interfaces/User";
import { Box } from "@mui/system";
import { Chip, List, ListItem, ListItemText, Typography } from "@mui/material";

interface UserCardProps {
  user: User;
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
        <ListItem>
          <ListItemText primary={user.phone} secondary="Номер телефона" />
        </ListItem>
        <ListItem>
          <ListItemText primary={user.email} secondary="Адрес почты" />
        </ListItem>
      </List>
    </Box>
  );
};
