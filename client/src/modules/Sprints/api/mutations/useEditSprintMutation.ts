import { sprintsControllerUpdate, UpdateSprintDto } from "@generated";
import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { getSprintQueryKey } from "../queryOptions";

export const useEditSprintMutation = () => {
  return useMutation({
    mutationFn: ({ sprint, sprintId }: { sprint: UpdateSprintDto, sprintId: number }) => sprintsControllerUpdate({ body: sprint, path: { id: sprintId.toString() } }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(),
      });
    },
  });
};
