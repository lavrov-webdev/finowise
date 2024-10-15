import { getSprintsQueryOptions } from "@modules/Sprints/api/queryOptions";
import { queryClient } from "@system/queryClient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sprints/")({
  loader: () => queryClient.ensureQueryData(getSprintsQueryOptions()),
});
