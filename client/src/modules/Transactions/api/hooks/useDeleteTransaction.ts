import { useMutation } from "@tanstack/react-query";
import { deleteTransaction } from "../requests/deleteTransaction";
import { queryClient } from "@system/queryClient";
import { getSprintQueryKey } from "@modules/Sprints";
import { getTransactionsQueryKey } from "../queryOptions";

export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(res.sprintId),
      });
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey(),
      });
    },
  });
};
