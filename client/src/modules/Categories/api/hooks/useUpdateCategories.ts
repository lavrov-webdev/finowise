import { useMutation } from "@tanstack/react-query";
import { getCategoriesQueryKey } from "../queryOptions";
import { updateCategories } from "../requests/updateCategories";
import { queryClient } from "@system/queryClient";
import { useAddErrorToaster } from "@system/hooks";
import { AxiosError } from "axios";

export const useUpdateCategories = (onSuccess: () => void) => {
  const addErrorToaster = useAddErrorToaster();
  return useMutation({
    mutationKey: getCategoriesQueryKey(),
    mutationFn: updateCategories,
    onSuccess: () => {
      onSuccess();
      queryClient.invalidateQueries({ queryKey: getCategoriesQueryKey() });
    },
    onError: (error: AxiosError) => {
      addErrorToaster("Не удалось обновить категории", error);
    },
  });
};
