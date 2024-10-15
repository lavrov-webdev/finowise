import { useMutation } from "@tanstack/react-query";
import { editEnvelope } from "../requests/editEnvelope";
import { queryClient } from "@system/queryClient";
import { getSprintQueryKey } from "@modules/Sprints";
import { useAddErrorToaster } from "@system/hooks";
import { AxiosError } from "axios";

export const useEditEnvelope = (onSuccess: () => void) => {
  const addErrorToaster = useAddErrorToaster();
  return useMutation({
    mutationFn: editEnvelope,
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: getSprintQueryKey(),
      });
      onSuccess();
    },
    onError(e) {
      addErrorToaster("Ошибка редактирования конверта", e as AxiosError);
    },
  });
};
