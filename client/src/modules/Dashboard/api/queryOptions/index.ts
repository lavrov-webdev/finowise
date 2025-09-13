import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { REPORT_QUERY_KEY } from "../consts";
import { reportControllerFind } from "@generated";
import { isNoUndefined } from "../../../../utils/filterUtils";

export type ReportQueryKeyParams = {
  sprintId?: number;
  categoryId?: number;
};

export const getReportQueryKey = (params?: ReportQueryKeyParams) =>
  [REPORT_QUERY_KEY, params?.sprintId, params?.categoryId].filter(
    isNoUndefined,
  );

export const getReportQueryOptions = (params?: ReportQueryKeyParams) =>
  queryOptions({
    queryKey: getReportQueryKey(params),
    queryFn: async () => {
      const response = await reportControllerFind({
        query: {
          sprintId: params?.sprintId,
          categoryId: params?.categoryId,
        },
      });
      if (response.error) {
        throw response.error;
      }
      return response.data;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    placeholderData: keepPreviousData,
  });
