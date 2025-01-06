import { envelopesControllerUpdate, UpdateEnvelopeDto } from "@generated";
import { getSprintQueryKey } from "@modules/Sprints";
import { useAddErrorToaster } from "@system/hooks";
import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useEditEnvelope = (onSuccess: () => void) => {
  const addErrorToaster = useAddErrorToaster();
  return useMutation({
    mutationFn: ({ envelope, envelopeId }: { envelope: UpdateEnvelopeDto, envelopeId: number }) => envelopesControllerUpdate({ body: envelope, path: { id: envelopeId.toString() } }),
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
