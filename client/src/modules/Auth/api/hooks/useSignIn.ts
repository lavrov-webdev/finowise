import { useAddErrorToaster } from "@system/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AUTH_QUERY_KEY } from "../const";
import { authControllerSignIn, SignInDto } from "@generated";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const addErrorToast = useAddErrorToaster();
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: (data: SignInDto) => authControllerSignIn({ body: data }),
    onSuccess: async () => {
      await queryClient.invalidateQueries()
      await queryClient.clear()
    },
    onError(error: AxiosError) {
      addErrorToast("Ошибка авторизации", error);
    },
  });
};
