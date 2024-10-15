import { filterUndefined } from "@system/utils/filterUndefined";
import { SPRINTS_QUERY_KEY, CURRENT_SPRINT_QUERY_KEY } from "../consts";
import { queryOptions } from "@tanstack/react-query";
import { getSprints } from "../requests/getSprints";
import { getSprintById } from "../requests/getSprintById";
import { getCurrentSprint } from "../requests/getCurrentSprint";

export const getSprintQueryKey = (id?: number) =>
  filterUndefined([SPRINTS_QUERY_KEY, id]);
export const getCurrentSprintQueryKey = () => [CURRENT_SPRINT_QUERY_KEY];

export const getSprintsQueryOptions = () =>
  queryOptions({
    queryKey: getSprintQueryKey(),
    queryFn: getSprints,
  });

export const getSprintByIdQueryOptions = (id: number) =>
  queryOptions({
    queryKey: getSprintQueryKey(id),
    queryFn: () => getSprintById(id),
  });

export const getCurrentSprintQueryOptions = () =>
  queryOptions({
    queryKey: getCurrentSprintQueryKey(),
    queryFn: getCurrentSprint,
    staleTime: 1000 * 60,
  });
