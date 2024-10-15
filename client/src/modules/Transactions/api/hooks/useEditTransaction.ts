import { getSprintQueryKey } from "@modules/Sprints";
import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { getTransactionsQueryKey } from "../queryOptions";
import { editTransaction } from "../requests/editTransaction";

export const useEditTransaction = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: editTransaction,
    onSuccess: (data) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: getTransactionsQueryKey({ id: data.id }),
        }),
        queryClient.invalidateQueries({
          queryKey: getSprintQueryKey(data.sprintId),
        }),
      ]).then(() => onSuccess());
    },
  });
};
