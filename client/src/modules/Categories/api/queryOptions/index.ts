import { queryOptions } from "@tanstack/react-query";
import { CATEGORIES_QUERY_KEY } from "../consts";
import { categoriesControllerFindAll } from "@generated";

export const getCategoriesQueryKey = () => [CATEGORIES_QUERY_KEY];

export const getCategoriesQueryOptions = () =>
  queryOptions({
    queryKey: getCategoriesQueryKey(),
    queryFn: () => {
      return categoriesControllerFindAll();
    },
  });
