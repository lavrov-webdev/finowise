import { sprintsControllerRemove } from "@generated";
import { useAddSuccessToaster } from "@system/hooks";
import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { getCurrentSprintQueryKey, getSprintQueryKey } from "../queryOptions";

export const useDeleteSprintMutation = () => {
  const navigate = useNavigate();
  const successToaster = useAddSuccessToaster();

  return useMutation({
    mutationFn: (id: number) =>
      sprintsControllerRemove({ path: { id: id.toString() } }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: getCurrentSprintQueryKey(),
      });
      successToaster("Спринт удален");
      navigate({ to: "/sprints" });
    },
  });
};
