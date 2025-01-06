import { useAddErrorToaster } from "@system/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AUTH_QUERY_KEY } from "../const";
import { authControllerSignUp, CreateUserDto } from "@generated";

export const useSignUp = () => {
  const queryClient = useQueryClient();
  const addErrorToaster = useAddErrorToaster();
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: (user: CreateUserDto) => authControllerSignUp({ body: user }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] }),
    onError(error: AxiosError) {
      addErrorToaster("Ошибка регистарции", error);
    },
  });
};
