import { TCreateSprintDto } from "@modules/Sprints/types";
import { useAddErrorToaster, useAddSuccessToaster } from "@system/hooks";
import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getCurrentSprintQueryKey, getSprintQueryKey } from "../queryOptions";
import { createSprint } from "../requests/createSprint";

export const useCreateSprint = () => {
  const errorToaster = useAddErrorToaster();
  const successToaster = useAddSuccessToaster();
  return useMutation({
    mutationFn: (sprint: TCreateSprintDto) => createSprint(sprint),
    onSuccess: () => {
      successToaster("Спринт создан");
      queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(),
      });
      queryClient.invalidateQueries({
        queryKey: getCurrentSprintQueryKey(),
      });
    },
    onError(error) {
      errorToaster("Не удалось создать спринт", error as AxiosError);
    },
  });
};
