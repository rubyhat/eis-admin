import React from "react";
import { AxiosError } from "axios";

import { Alert } from "@mui/material";
import { ApiErrorResponse } from "../../interfaces";

interface AxiosErrorAlertMessageProps {
  error: AxiosError<ApiErrorResponse>;
}

export const AxiosErrorAlertMessage = ({
  error,
}: AxiosErrorAlertMessageProps) => {
  const message = error.response?.data?.message || error.message;
  const code = error.response?.data?.statusCode;
  return (
    <Alert severity="error">
      Ошибка получения данных с сервера.{" "}
      <strong>
        {message} Code: {code}
      </strong>
    </Alert>
  );
};
