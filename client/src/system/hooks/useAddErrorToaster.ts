import { useToaster } from "@gravity-ui/uikit";
import { AxiosError } from "axios";
import { useCallback } from "react";

export const useAddErrorToaster = () => {
  const toast = useToaster();
  const addErrorToaster = useCallback(
    (title: string, error: AxiosError, name?: string) => {
      toast.add({
        title,
        name: name ?? "internal-error",
        theme: "danger",
        content: error.message,
      });
    },
    [toast],
  );

  return addErrorToaster;
};
