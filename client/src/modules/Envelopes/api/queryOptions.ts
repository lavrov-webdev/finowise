import { filterUndefined } from "@system/utils/filterUndefined";
import { ENVELOPES_QUERY_KEY } from "./consts";
import { queryOptions } from "@tanstack/react-query";
import { envelopesControllerGetByDate } from "@generated";

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
    queryFn: () => envelopesControllerGetByDate({ path: { date: date! } }),
    enabled: !!date,
  });
