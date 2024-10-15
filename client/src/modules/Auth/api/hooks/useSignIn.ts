import { useAddErrorToaster } from "@system/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AUTH_QUERY_KEY } from "../const";
import { signIn } from "../requests/signIn";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const addErrorToast = useAddErrorToaster();
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: signIn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] }),
    onError(error: AxiosError) {
      addErrorToast("Ошибка авторизации", error);
    },
  });
};
