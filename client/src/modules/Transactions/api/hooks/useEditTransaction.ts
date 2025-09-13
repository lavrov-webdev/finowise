import { getSprintQueryKey } from "@modules/Sprints";
import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { getTransactionsQueryKey } from "../queryOptions";
import { transactionsControllerUpdate, UpdateTransactionDto } from "@generated";

export const useEditTransaction = (onSuccess: () => void) => {
  return useMutation({
    mutationFn: ({
      transaction,
      transactionId,
    }: {
      transaction: UpdateTransactionDto;
      transactionId: number;
    }) =>
      transactionsControllerUpdate({
        body: transaction,
        path: { id: transactionId.toString() },
      }),
    onSuccess: (response) => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: getTransactionsQueryKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: getSprintQueryKey(response.data?.sprintId),
        }),
      ]).then(() => onSuccess());
    },
  });
};
