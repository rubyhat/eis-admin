import React from "react";
import {
  Alert,
  Box,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { CiImageOff } from "react-icons/ci";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

import { EstateAgentInfo } from "../../../../shared/interfaces/EstateObjectTypes";
import { apiUsersModule } from "../../api";
import { UserDeleteDrawer } from "../UserDeleteDrawer";
import { useUsersStore } from "../../store/useUsersStore";
import { useUserStore } from "../../../UserModule/store/useUserStore";
import dayjs from "dayjs";

interface UserCardProps {
  user: EstateAgentInfo;
}

export const UserCard = ({ user }: UserCardProps) => {
  const { setIsDeleteDrawerOpen } = useUsersStore((state) => state);
  const { user: currentUser, isAdmin } = useUserStore((state) => state);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
  const handleClickEditButton = () =>
    navigate("/users/edit", { state: { editUserData: user } });

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
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <Typography component="h6" variant="titleSecondEmphasized">
            {user.name}
          </Typography>
          <Box paddingTop={1}>
            <Chip label={user.role} color="primary" size="small" />
            {(isAdmin || currentUser?._id === user._id) && (
              <>
                <IconButton onClick={handleClickEditButton} color="primary">
                  <FiEdit2 size={20} />
                </IconButton>
                <IconButton color="error" onClick={handleClickDeleteButton}>
                  <MdDeleteOutline />
                </IconButton>
                <UserDeleteDrawer
                  onClick={handleClickDeleteButton}
                  onDelete={handleDeleteUser}
                />
              </>
            )}
          </Box>
        </ListItem>
        <ListItem>
          <ListItemText
            sx={{ margin: 0 }}
            primary={user.username}
            secondary="Никнейм"
          />
        </ListItem>
        {user.phone && (
          <ListItem>
            <ListItemText
              sx={{ margin: 0 }}
              primary={user.phone}
              secondary="Номер телефона"
            />
          </ListItem>
        )}
        {user.email && (
          <ListItem>
            <ListItemText
              sx={{ margin: 0 }}
              primary={user.email}
              secondary="Адрес почты"
            />
          </ListItem>
        )}
        {user.birthday && (
          <ListItem>
            <ListItemText
              sx={{ margin: 0 }}
              primary={dayjs(user.birthday).format("DD.MM.YYYY")}
              secondary="Дата рождения"
            />
          </ListItem>
        )}
      </List>
      {user.avatar ? (
        <Box
          component="img"
          src={user.avatar}
          alt="Фото сотрудника не загрузилось"
          sx={{ width: 1, maxWidth: 464, borderRadius: 2 }}
        />
      ) : (
        <Box
          sx={{
            border: "2px solid",
            borderRadius: 2,
            borderColor: "lightgrey",
          }}
        >
          <CiImageOff size="100%" color="lightgrey" />
          <Alert severity="warning" sx={{ margin: 2 }}>
            Фото не найдено!
          </Alert>
        </Box>
      )}
    </Box>
  );
};
