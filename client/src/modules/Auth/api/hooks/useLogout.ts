import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { AUTH_QUERY_KEY } from "../const";
import { authControllerLogout } from "@generated";

export const useLogout = () => {
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: () => authControllerLogout(),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] }),
  });
};
