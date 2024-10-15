import { useQuery } from "@tanstack/react-query";
import { getCategoriesQueryOptions } from "../queryOptions";

export const useGetCategories = () => {
  return useQuery(getCategoriesQueryOptions());
};
