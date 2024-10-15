import { queryClient } from "@system/queryClient";
import { useMutation } from "@tanstack/react-query";
import { AUTH_QUERY_KEY } from "../const";
import { logout } from "../requests/logout";

export const useLogout = () => {
  return useMutation({
    mutationKey: [AUTH_QUERY_KEY],
    mutationFn: logout,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [AUTH_QUERY_KEY] }),
  });
};
