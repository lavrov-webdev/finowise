import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@system/queryClient";
import { getTransactionsQueryKey } from "../queryOptions";
import { getSprintQueryKey } from "@modules/Sprints";
import { CreateTransactionDto, transactionsControllerCreate } from "@generated";

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: (transaction: CreateTransactionDto) => transactionsControllerCreate({ body: transaction }),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: getTransactionsQueryKey() });
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(response.data?.sprintId),
      });
    },
  });
};
