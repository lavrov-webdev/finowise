import { useAddErrorToaster } from "@system/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AUTH_QUERY_KEY } from "../const";
import { signUp } from "../requests/signUp";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const addErrorToaster = useAddErrorToaster();
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: signUp,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] }),
    onError(error: AxiosError) {
      addErrorToaster("Ошибка регистарции", error);
    },
  });
};
