import { queryOptions } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "../consts";
import { getCategories } from "../requests/getCategories";

export const getCategoriesQueryKey = () => [CATEGORIES_QUERY_KEY];

export const getCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: getCategoriesQueryKey(),
    queryFn: () => {
      return getCategories();
    },
  });
