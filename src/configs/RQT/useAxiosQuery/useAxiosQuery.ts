import { AxiosError } from "axios";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import { ApiErrorResponse } from "../../../shared/interfaces";

export function useAxiosQuery<TData>(
  options: UseQueryOptions<TData, AxiosError<ApiErrorResponse>>,
): UseQueryResult<TData, AxiosError<ApiErrorResponse>> {
  return useQuery<TData, AxiosError<ApiErrorResponse>>(options);
}
