import { useToaster } from "@gravity-ui/uikit";
import { useCallback } from "react";

export const useAddSuccessToaster = () => {
  const toast = useToaster();
  const addSuccessToaster = useCallback(
    (title: string, content?: string, name?: string) => {
      toast.add({
        title,
        name: name ?? "success",
        theme: "success",
        content: content,
      });
    },
    [toast],
  );

  return addSuccessToaster;
};
