import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@system/queryClient";
import { getSprintQueryKey } from "@modules/Sprints";
import { getTransactionsQueryKey } from "../queryOptions";
import { transactionsControllerRemove } from "@generated";

export const useDeleteTransaction = () => {
  return useMutation({
    mutationFn: (id: number) =>
      transactionsControllerRemove({ path: { id: id.toString() } }),
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(res.data?.sprintId),
      });
      queryClient.invalidateQueries({
        queryKey: getTransactionsQueryKey(),
      });
    },
  });
};
