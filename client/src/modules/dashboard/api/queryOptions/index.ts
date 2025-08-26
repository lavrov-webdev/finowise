import { queryOptions } from "@tanstack/react-query";
import { REPORT_QUERY_KEY } from "../consts";
import { reportControllerFind } from "@generated";

export const getReportQueryKey = () => [REPORT_QUERY_KEY];

export const getReportQueryOptions = () =>
    queryOptions({
        queryKey: getReportQueryKey(),
        queryFn: async () => {
            const response = await reportControllerFind();
            if (response.error) {
                throw response.error;
            }
            return response.data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    });
