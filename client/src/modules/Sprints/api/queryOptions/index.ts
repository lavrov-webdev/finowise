import { filterUndefined } from "@system/utils/filterUndefined";
import { SPRINTS_QUERY_KEY, CURRENT_SPRINT_QUERY_KEY } from "../consts";
import { queryOptions } from "@tanstack/react-query";
import { sprintsControllerFindAll, sprintsControllerFindCurrent, sprintsControllerFindOne } from "@generated";

export const getSprintQueryKey = (id?: number) =>
  filterUndefined([SPRINTS_QUERY_KEY, id]);
export const getCurrentSprintQueryKey = () => [CURRENT_SPRINT_QUERY_KEY];

export const getSprintsQueryOptions = () =>
  queryOptions({
    queryKey: getSprintQueryKey(),
    queryFn: sprintsControllerFindAll,
  });

export const getSprintByIdQueryOptions = (id?: number) =>
  queryOptions({
    queryKey: getSprintQueryKey(id),
    queryFn: () => sprintsControllerFindOne({ path: { id: id!.toString() } }),
    enabled: !!id,
  });

export const getCurrentSprintQueryOptions = () =>
  queryOptions({
    queryKey: getCurrentSprintQueryKey(),
    queryFn: sprintsControllerFindCurrent,
    staleTime: 1000 * 60,
  });
