import { useQuery } from "@tanstack/react-query";
import { userInfoQueryOptions } from "../queryOptions";

export const useUserInfo = () => {
  return useQuery(userInfoQueryOptions);
};
