import React from "react";
import {
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { MdDeleteOutline } from "react-icons/md";
import { EstateAgentInfo } from "../../../../shared/interfaces/EstateObjectTypes";
import { apiUsersModule } from "../../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UserCardProps {
  user: EstateAgentInfo;
}

export const UserCard = ({ user }: UserCardProps) => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => apiUsersModule.deleteUserById(userId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["usersItems"] });
    },
  });

  const handleDeleteButtonClick = () => {
    if (user._id) {
      // todo: remove if
      deleteUserMutation.mutate(user._id);
    }
  };

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
        <ListItem
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography component="h6" variant="titleSecondEmphasized">
            {user.name} <Chip label={user.role} color="primary" size="small" />
          </Typography>
          <IconButton color="error" onClick={handleDeleteButtonClick}>
            <MdDeleteOutline />
          </IconButton>
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
