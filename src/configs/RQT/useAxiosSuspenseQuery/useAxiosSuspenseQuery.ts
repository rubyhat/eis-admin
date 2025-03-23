import { AxiosError } from "axios";
import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult,
} from "@tanstack/react-query";

import { ApiErrorResponse } from "../../../shared/interfaces";

export function useAxiosSuspenseQuery<TData>(
  options: UseSuspenseQueryOptions<TData, AxiosError<ApiErrorResponse>>,
): UseSuspenseQueryResult<TData, AxiosError<ApiErrorResponse>> {
  return useSuspenseQuery<TData, AxiosError<ApiErrorResponse>>(options);
}
