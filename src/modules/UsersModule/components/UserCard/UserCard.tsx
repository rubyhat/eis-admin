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
import { UserDeleteDrawer } from "../UserDeleteDrawer";
import { useUsersStore } from "../../store/useUsersStore";
import toast from "react-hot-toast";
import { useUserStore } from "../../../UserModule/store/useUserStore";

interface UserCardProps {
  user: EstateAgentInfo;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { setIsDeleteDrawerOpen } = useUsersStore((state) => state);
  const { user: currentUser } = useUserStore((state) => state);
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: (userId: string) => apiUsersModule.deleteUserById(userId),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["usersItems"] });
      toast.success("Пользователь успешно удален!");
    },
    onError() {
      toast.error("Извините, произошла ошибка, обратитесь в тех. поддержку.");
    },
    onSettled() {
      setIsDeleteDrawerOpen(false);
    },
  });

  const handleDeleteUser = () => {
    // todo: remove if
    if (user._id) {
      deleteUserMutation.mutate(user._id);
    }
  };

  const handleClickDeleteButton = () => setIsDeleteDrawerOpen(true);

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
          {currentUser && currentUser.role === "Admin" && (
            <>
              <IconButton color="error" onClick={handleClickDeleteButton}>
                <MdDeleteOutline />
              </IconButton>
              <UserDeleteDrawer
                onClick={handleClickDeleteButton}
                onDelete={handleDeleteUser}
              />
            </>
          )}
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
      {user.avatar && (
        <Box
          component="img"
          src={user.avatar as string}
          alt="Фото сотрудника не загрузилось"
          sx={{ width: 1, maxWidth: 512, borderRadius: 2 }}
        />
      )}
    </Box>
  );
};
