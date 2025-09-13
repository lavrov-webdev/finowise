import { filterUndefined } from "@system/utils/filterUndefined";
import { TRANSACTIONS_QUERY_KEY } from "../consts";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import {
  transactionsControllerSearch,
  TransactionsControllerSearchData,
} from "@generated";

type QueryKeyParams = {
  id?: number;
  query: Omit<TransactionsControllerSearchData["query"], "id">;
};

export const getTransactionsQueryKey = (params?: QueryKeyParams) =>
  filterUndefined([TRANSACTIONS_QUERY_KEY, params?.id, params?.query]);

export const getTransactionsQueryOptions = (
  params?: QueryKeyParams,
  {
    keepPrevious = true,
  }: {
    keepPrevious?: boolean;
  } = {},
) =>
  queryOptions({
    queryKey: getTransactionsQueryKey(params),
    queryFn: async () => {
      const { data } = await transactionsControllerSearch({
        query: params?.query,
      });
      return data;
    },
    placeholderData: keepPrevious ? keepPreviousData : undefined,
  });
