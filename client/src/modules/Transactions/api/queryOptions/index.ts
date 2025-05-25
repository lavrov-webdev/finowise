import { filterUndefined } from "@system/utils/filterUndefined";
import { TRANSACTIONS_QUERY_KEY } from "../consts";
import { queryOptions } from "@tanstack/react-query";
import { transactionsControllerSearch, TransactionsControllerSearchData } from "@generated";

type QueryKeyParams = {
  id?: number;
  filters: Omit<TransactionsControllerSearchData["query"], 'id'>
};

export const getTransactionsQueryKey = (params?: QueryKeyParams) =>
  filterUndefined([TRANSACTIONS_QUERY_KEY, params?.id, params?.filters]);

export const getTransactionsQueryOptions = (filters: QueryKeyParams) =>
  queryOptions({
    queryKey: getTransactionsQueryKey(filters),
    queryFn: () => transactionsControllerSearch({ query: filters.filters }),
  });