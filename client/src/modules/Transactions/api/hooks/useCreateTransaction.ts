import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../requests/createTransaction";
import { queryClient } from "@system/queryClient";
import { getTransactionsQueryKey } from "../queryOptions";
import { getSprintQueryKey } from "@modules/Sprints";

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: getTransactionsQueryKey() });
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(data.sprintId),
      });
    },
  });
};
