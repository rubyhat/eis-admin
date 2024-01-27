import React from "react";
import { CustomButton } from "../../../../components/CustomButton";
import { apiAppModule } from "../../api/apiAppModule";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const LogoutButton = () => {
  const navigate = useNavigate();
  const handleButtonClick = async () => {
    try {
      await apiAppModule.logout();
      toast.success("Вы успешно вышли из аккаунта!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Произошла ошибка, пожалуйста, обратитесь в тех. поддержку");
    }
  };

  return (
    <CustomButton
      onClick={handleButtonClick}
      sx={{ backgroundColor: "tomato", marginLeft: 2 }}
    >
      Выйти
    </CustomButton>
  );
};
