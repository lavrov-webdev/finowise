import { filterUndefined } from "@system/utils/filterUndefined";
import { ENVELOPES_QUERY_KEY } from "./consts";
import { queryOptions } from "@tanstack/react-query";
import { getEnvelopesByDate } from "./requests/getEnvelopesByDate";

type TGetEnvelopesQueryKeyProps = {
  id?: number;
  filters?: {
    date?: string;
  };
};

export const getEnvelopesQueryKey = (props?: TGetEnvelopesQueryKeyProps) =>
  filterUndefined([ENVELOPES_QUERY_KEY, props?.filters, props?.id]);

export const getEnvelopesByDateQueryOptions = (date?: string) =>
  queryOptions({
    queryKey: getEnvelopesQueryKey({ filters: { date } }),
    queryFn: () => getEnvelopesByDate(date!),
    enabled: !!date,
  });
