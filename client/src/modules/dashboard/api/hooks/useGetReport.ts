import { useQuery } from "@tanstack/react-query";
import { getReportQueryOptions, ReportQueryKeyParams } from "../queryOptions";

export const useGetReport = (params?: ReportQueryKeyParams) => {
  return useQuery(getReportQueryOptions(params));
};
