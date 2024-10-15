import { filterUndefined } from "@system/utils/filterUndefined";
import { TRANSACTIONS_QUERY_KEY } from "../consts";
import { queryOptions } from "@tanstack/react-query";
import { getTransactions } from "../requests/getTransactions";

type QueryKeyParams = {
  id?: number;
  filters?: {
    sprintId?: number;
  };
};

export const getTransactionsQueryKey = (params?: QueryKeyParams) =>
  filterUndefined([TRANSACTIONS_QUERY_KEY, params?.id, params?.filters]);

export const getTransactionsQueryOptions = () =>
  queryOptions({
    queryKey: getTransactionsQueryKey(),
    queryFn: getTransactions,
  });
