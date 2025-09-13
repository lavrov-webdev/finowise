import { useAddErrorToaster } from "@system/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AUTH_QUERY_KEY } from "../const";
import { authControllerSignIn, AuthControllerSignInData } from "@generated";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const addErrorToast = useAddErrorToaster();
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: (data: AuthControllerSignInData["body"]) =>
      authControllerSignIn({ body: data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      await queryClient.clear();
    },
    onError(error: AxiosError) {
      addErrorToast("Ошибка авторизации", error);
    },
  });
};
