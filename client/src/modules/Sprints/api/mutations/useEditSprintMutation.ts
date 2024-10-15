import { useMutation } from "@tanstack/react-query";
import { editSprint } from "../requests/editSprint";
import { queryClient } from "@system/queryClient";
import { getSprintQueryKey } from "../queryOptions";

export const useEditSprintMutation = () => {
  return useMutation({
    mutationFn: editSprint,
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(),
      });
    },
  });
};
