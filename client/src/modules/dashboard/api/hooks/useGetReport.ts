import { useQuery } from "@tanstack/react-query";
import { getReportQueryOptions } from "../queryOptions";

export const useGetReport = () => {
  return useQuery(getReportQueryOptions());
};
