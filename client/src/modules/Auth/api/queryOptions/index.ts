import { queryOptions } from "@tanstack/react-query";
import { AUTH_QUERY_KEY } from "../const";
import { userInfo } from "../requests/userInfo";

export const userInfoQueryOptions = queryOptions({
  queryKey: [AUTH_QUERY_KEY],
  queryFn: async () => {
    return userInfo();
  },
  retry: true,
});
