import { useEffect } from "react";
import { useAddErrorToaster } from "./useAddErrorToaster";
import { AxiosError } from "axios";

export const useErrorNotifier = (
  error?: AxiosError | null,
  title = "Ошибка сети",
) => {
  const addToaster = useAddErrorToaster();
  useEffect(() => {
    if (error) {
      addToaster(title, error);
    }
  }, [error, title, addToaster]);
};
