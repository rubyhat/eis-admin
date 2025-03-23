import { AxiosError } from "axios";
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

import { ApiErrorResponse } from "../../../shared/interfaces";

export function useAxiosMutation<TData, TVariables>(
  options: UseMutationOptions<TData, AxiosError<ApiErrorResponse>, TVariables>,
): UseMutationResult<TData, AxiosError<ApiErrorResponse>, TVariables> {
  return useMutation<TData, AxiosError<ApiErrorResponse>, TVariables>(options);
}
