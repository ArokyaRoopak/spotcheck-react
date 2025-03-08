import { AxiosError } from "axios";
import { CustomError } from "./custom-error";

function isAxiosError(error: any): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

export function handleError(error: AxiosError<any> | Error | any): CustomError {
  if (isAxiosError(error)) {
    return new CustomError({
      type: "axios-error",
      error:
        (error.response?.data as any)?.message?.replace(/['"]+/g, "") ??
        JSON.stringify(error.response?.data),
      status: error.status ?? error.response?.status,
    });
  }
  return new CustomError({
    type: "stock-error",
    error: error.message ?? error.error,
  });
}
