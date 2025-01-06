import { queryOptions } from "@tanstack/react-query";
import { AUTH_QUERY_KEY } from "../const";
import { usersControllerGetMe } from "@generated";

export const userInfoQueryOptions = queryOptions({
  queryKey: [AUTH_QUERY_KEY],
  queryFn: async () => {
    return usersControllerGetMe();
  },
  retry: true,
});
